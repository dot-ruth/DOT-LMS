import React from "react";
import { Box,ThemeProvider } from "@mui/material"
import theme from "../theme";
import  { useState,useEffect } from "react";
import useKeyPress from "../hooks/useKeyPress"
import { languageOptions } from "../constants/languageOptions";
import {toast } from "react-toastify";
import axios from "axios";
import { classnames } from "../utils/general";
import StudentSideDrawer from "./StudentSideDrawer";
import IDElanguageDropdown from "./IDElanguageDropdown";
import IDEcodeEditor from "./IDEcodeEditor";
import IDEoutput from "./IDEoutput";
import IDEinput from "./IDEinput";
import IDEoutputDetails from "./IDEoutputDetails";

const javascriptDefault="// some Comment";
export default function StudentIDE(){
    const [code, setCode] = useState(javascriptDefault);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const IDE_theme = "cobalt";
    const [language, setLanguage] = useState(languageOptions[0]);
  
    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = (sl) => {
        setLanguage(sl);
      };

      

      useEffect(() => {
        if (enterPress && ctrlPress) {
          console.log("enterPress", enterPress);
          console.log("ctrlPress", ctrlPress);
          handleCompile();
        }
      });

      const onChange = (action, data) => {
        switch (action) {
          case "code": {
            setCode(data);
            break;
          }
          default: {
            console.warn("case not handled!", action, data);
          }
        }
      };

      const handleCompile = () => {
        setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "7a704eff56mshc2e276f01d0b5cfp12d0fbjsn3a00fe5cc466",
      },
      data: formData,
    };

    axios
    .request(options)
    .then(function (response) {
      console.log("res.data", response.data);
      const token = response.data.token;
      checkStatus(token);
    })
    .catch((err) => {
      //let error = err.response ? err.response.data : err;
      // get error status
      let status = err.response.status;
      console.log("status", status);
      if (status === 429) {
        console.log("too many requests", status);
      }
  });
      
      }
      const checkStatus = async (token) => {
        const options = {
            method: "GET",
            url: 'https://judge0-ce.p.rapidapi.com/submissions/' + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
              "X-RapidAPI-Key": "7a704eff56mshc2e276f01d0b5cfp12d0fbjsn3a00fe5cc466",
            },
          };
          try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;
      
            // Processed - we have a result
            if (statusId === 1 || statusId === 2) {
              // still processing
              setTimeout(() => {
                checkStatus(token)
              }, 2000)
              return
            } else {
              setProcessing(false)
              setOutputDetails(response.data)
              showSuccessToast(`Compiled Successfully!`)
              console.log('response.data', response.data)
              return
            }
          } catch (err) {
            console.log("err", err);
            setProcessing(false);
            showErrorToast();
          }
      };

      const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled Successfully!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
      const showErrorToast = (msg) => {
        toast.error(msg || `Something went wrong! Please try again.`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };


    return (
        <Box>
            <ThemeProvider theme={theme}>
        <StudentSideDrawer/> 
        <Box 
        sx={{ml: `calc(${theme.spacing(7)} + 15px)`,
        display:'flex', 
        justifyContent:'space-between',
        height:'100vh',
        overflowY:'hidden',
        }}>
            <Box sx={{mt:1}}>
            <>
      
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
      
        <div className="flex flex-col w-full h-full justify-start items-start">
        <div className="px-4 py-3">
          <IDElanguageDropdown onSelectChange={onSelectChange} />
        </div>

          <IDEcodeEditor
           onchange={onChange}
           language={language?.value}
           code={code}
           theme={IDE_theme}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[50%] flex-col">
          <IDEoutput outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <IDEinput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-2 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && <IDEoutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
      
      
    </>
        </Box>
        </Box>
        </ThemeProvider>
        </Box>
        
    )
              }
