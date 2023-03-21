import tl = require('azure-pipelines-task-lib/task');
const tr = require('azure-pipelines-task-lib/toolrunner');
const fs = require('fs');
const path = require('path');


async  function run() {
  try {
      
       const endpointId: string | undefined = tl.getInput('connection', true);
	   console.log(endpointId)
       if (endpointId) {
            const endpointAuth: tl.EndpointAuthorization | undefined = tl.getEndpointAuthorization(endpointId, false);
            if(endpointAuth){
                const url = tl.getEndpointUrl(endpointId, false);
				const username: string = endpointAuth.parameters.username;
                const password: string = endpointAuth.parameters.password;		
                
				
				console.log("##vso[task.setvariable variable=SONARQUBE_URL;]",username)
				console.log("##vso[task.setvariable variable=SONARQUBE_USERNAME;]",username)	
				console.log("##vso[task.setvariable variable=SONARQUBE_PASSWORD;]",password)
				
				
          } else {
               console.error('endpointAuth object not found............')
          }
        } else {
            console.error(`Authorization for endpoint '${endpointId}' not found.`);
        }
		
		
		
	   const endpointId2: string | undefined = tl.getInput('ADOConnection', true);
	   console.log(endpointId2)
       if (endpointId2) {
            const endpointAuth2: tl.EndpointAuthorization | undefined = tl.getEndpointAuthorization(endpointId2, false);
            if(endpointAuth2){
                const url = tl.getEndpointUrl(endpointId2, false);				
				const token = endpointAuth2.parameters.apitoken
                console.log(url)
			    tl.debug(`System access token: ${token}`);
			   console.log("##vso[task.setvariable variable=ORG_URL;]",url)
			   console.log("##vso[task.setvariable variable=ORG_PAT;]",token)
			   
			   
			   
              // Task succeeded
               tl.setResult(tl.TaskResult.Succeeded, 'Task completed successfully');
			}

	    }			
			   
			   
			   
			   
		
		
		
		
		
		
		
		
		




		
	
  } catch (error) {
    // Task failed
    tl.setResult(tl.TaskResult.Failed, error.message);
  }
}

run();