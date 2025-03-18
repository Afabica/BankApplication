# Testing

## Example of configuration for a Spring Boot API

<mark> 
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan testname="Linux API Load Test" enabled="true">
      <hashTree>
        <ThreadGroup testname="Thread Group" enabled="true">
          <stringProp name="ThreadGroup.num_threads">5</stringProp>
          <stringProp name="ThreadGroup.ramp_time">10</stringProp>
          <stringProp name="ThreadGroup.loop_count">3</stringProp>
          <hashTree>
            <HTTPSamplerProxy testname="Spring Boot API" enabled="true">
              <stringProp name="HTTPSampler.domain">localhost</stringProp>
              <stringProp name="HTTPSampler.port">8080</stringProp>
              <stringProp name="HTTPSampler.path">/api/test</stringProp>
              <stringProp name="HTTPSampler.method">GET</stringProp>
            </HTTPSamplerProxy>
            <hashTree/>
          </hashTree>
        </ThreadGroup>
      </hashTree>
    </TestPlan>
  </hashTree>
</jmeterTestPlan>

</mark>

`It's configuration can run with command like "./bin/jmeter -n -t load-test.jmx -l results.jtl`
`-n` - Non-GUI mode
`-t` - Path to test plan
`-l` - Results filr (JTL format)

## Integrate with Prometheus for Metrics

<mark> 
<BackendListener testname="Prometheus Backend Listener" enabled="true">
    <stringProp name="backend_listener">org.apache.jmeter.visualizers.backend.prometheus.PrometheusBackendListenerClient</stringProp>
    <elementProp name="arguments" elementType="Arguments">
        <collectionProp name="Arguments.arguments">
            <elementProp name="port" elementType="Argument">
                <stringProp name="Argument.name">port</stringProp>
                <stringProp name="Argument.value">9270</stringProp>
            </elementProp>
            <elementProp name="host" elementType="Argument">
                <stringProp name="Argument.name">host</stringProp>
                <stringProp name="Argument.value">0.0.0.0</stringProp>
            </elementProp>
        </collectionProp>
    </elementProp>
</BackendListener>

</mark>

`sudo ufw allow 9270` - expose port on linux Firewall (if required);

## Configure Prometheus to Scrape Jmeter Metrics

- Edit the Prometheus config file (prometheus.yaml)

<mark> 
scrape_configs:
    - job_name: 'jmeter'
    static-configs: 
        - targets: ['localhost:9270']
</mark>

# Important Note

<mark>
In linux is possible run prometheus and grafana locally without use of kubernetes cluster.
</mark>

`0 0 * * * find /path/to/results -type f -mtime +7 -delete` - automatically clean old result files with a cron job.
`export JVM_ARGS="-Xms512m -Xmx2g` - run jmeter with limited memory usage.
`./bin/jmeter -n -t load-test.jmx -k results.jtl`
`htop ot top` - for monitor CPU and memory usage.
`tail -f /path/to/jmeter.log` - Ensure that your Kubernetes service is exposing the 9270 port for Prometheus.

## Troubleshooting

- Ports not exposed | Checl Linux firewall with sudo ufw status.
- Prometheus not scrapping | Check logs with journalctl -u prometheus
- Grafana not showing data | Verify Prometheus as a data source in Grafana
- JMeter not running

# Example with explanation of Jmeter integration with Grafana and Prometheus

<mark> 
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan testname="Spring Boot & Next.js Load Test" enabled="true">
      <hashTree>
        
        <!-- Thread Group for Simulating Load -->
        <ThreadGroup testname="User Simulation" enabled="true">
          <stringProp name="ThreadGroup.num_threads">10</stringProp>
          <stringProp name="ThreadGroup.ramp_time">10</stringProp>
          <stringProp name="ThreadGroup.loop_count">5</stringProp>
          <hashTree>

            <!-- Sampler for Spring Boot API -->
            <HTTPSamplerProxy testname="Spring Boot API" enabled="true">
              <stringProp name="HTTPSampler.domain">localhost</stringProp>
              <stringProp name="HTTPSampler.port">8080</stringProp>
              <stringProp name="HTTPSampler.path">/api/test</stringProp>
              <stringProp name="HTTPSampler.method">GET</stringProp>
            </HTTPSamplerProxy>

            <!-- Sampler for Next.js Frontend -->
            <HTTPSamplerProxy testname="Next.js Page Load" enabled="true">
              <stringProp name="HTTPSampler.domain">localhost</stringProp>
              <stringProp name="HTTPSampler.port">3000</stringProp>
              <stringProp name="HTTPSampler.path">/</stringProp>
              <stringProp name="HTTPSampler.method">GET</stringProp>
            </HTTPSamplerProxy>

            <!-- Response Assertion -->
            <ResponseAssertion testname="Status Code Check">
              <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
              <stringProp name="Assertion.test_type">equals</stringProp>
              <stringProp name="Assertion.value">200</stringProp>
            </ResponseAssertion>

          </hashTree>
        </ThreadGroup>

        <!-- Backend Listener for Prometheus Integration -->
        <BackendListener testname="Prometheus Backend Listener" enabled="true">
          <stringProp name="backend_listener">org.apache.jmeter.visualizers.backend.prometheus.PrometheusBackendListenerClient</stringProp>
          <elementProp name="arguments" elementType="Arguments">
            <collectionProp name="Arguments.arguments">
              <elementProp name="port" elementType="Argument">
                <stringProp name="Argument.name">port</stringProp>
                <stringProp name="Argument.value">9270</stringProp>
              </elementProp>
              <elementProp name="host" elementType="Argument">
                <stringProp name="Argument.name">host</stringProp>
                <stringProp name="Argument.value">0.0.0.0</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
        </BackendListener>

      </hashTree>
    </TestPlan>

  </hashTree>
</jmeterTestPlan>

</mark>

# Configure Grafana for Visualization 
1. Access Grafana
    Naviagate to `http://localhost:3090`
2. Add Prometheus as a Data Source. 
    - URL: `http://localhost:9090`
3. Create DashBoard: 
    - Add Panels for metrics like: 
        - jmeter_samples_total
        - jmeter_request_duration_seconds_avg
        - jmeter_request_duration_seconds_percentile_95


