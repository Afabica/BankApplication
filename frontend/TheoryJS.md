# JavaScrip, React, Next.js

## Errors and troubleshooting

### [Error]: Maximum call stack size exceeded

<mark>
    This error can occured if import multiple time the same components to another files.
    Solve of this problem is: 
    - Lazy import or dynamic import if possible, avoid direct imports inside the component definition. Instead, use dynamic. Like this: 
    const SidePanel = dynamic(() => import("../../comp"))
    - Avoid Functions inside JSX (onClick or onClose) instead of  
    <SidePanel onClose={setIsPanelOpen(false)} />
    Do this: 
const closePanel = () => setIsPanelOpen(false);
<SidePanel onClose={closePanel} />
    - Removing duplicate component imports 
    - Search for duplicate imports  
    - Use Centralized component exports like this: 
        - export { default as SidePanel} from "./dashcomp/MainPage";
        and than importing everything from one place like this: 
        import {SidePanel, PanelElements, Header} from "../../components";
    - Fix infinite renderes in useState and useEffect: 
    - Check SidePanel Conditional Rendering 
        Ensure that component doesn't re-render indefinitely 
        Only render when Open
        {isPanelOpen && <SidePanel isOpen={isPanelOpen} onClose{togglePanel}}/>}
    
</mark>
