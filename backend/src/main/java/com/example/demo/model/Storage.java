package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;

@Entity
@Table(name = "storage_files")
@Getter
@Setter
@NoArgsConstructor
public class Storage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String path;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false)
    private long size;

    @Transient
    private InputStream inputStream;

    public Storage(String path, MultipartFile file) throws IOException {
        this.path = path;
        this.fileName = file.getOriginalFilename();
        this.size = file.getSize();
        this.inputStream = file.getInputStream();
    }

    public Storage(String path, String fileName, long size, InputStream inputStream) {
        this.path = path;
        this.fileName = fileName;
        this.size = size;
        this.inputStream = inputStream;
    }

    public Storage(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "Storage{" +
                "id=" + id +
                ", path='" + path + '\'' +
                ", fileName='" + fileName + '\'' +
                ", size=" + size +
                '}';
    }
}

