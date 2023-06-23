import React, {useState} from "react";
import { Box } from "@mui/material";
import { Editor } from "@monaco-editor/react";
export default function IDEcodeEditor ({onchange,language,code,theme}){
    const [value,setValue] = useState(code );

    const handleEditorChange = (value) => {
        setValue(value);
        onchange("code",value);
    }

    return (
        <Box className="overlay rounded-md w-full h-full shadow-4xl">
      <Editor
        height="100vh"
        width="100vh"
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </Box>
  );
  
    
}


