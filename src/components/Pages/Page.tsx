import { useState } from "react";
import { SendDeleteRequest, SendGetRequest, SendPostRequest, SendPatchRequest } from "../utils/requests";
import CreateButton from "../Buttons/Button";


function getMessage(response: any): any {
  for (const key in response) {
    if (key === 'message') {
      return response[key];
    }
  }
    return "";
}

function generateDeleteForm(name: string, setResponse: Function): any {
  return (
    <div style = {{justifyContent: "center", display: "flex", flexDirection: "column", width: "15%", margin: "0 auto"}}>
      <form>
        <br />
        <br />
        <div> Delete {name} </div>
      <div style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: "10px"}}>
              <label style={{margin: "2px"}}>id</label>
              <input id={'idForDeletion'} type="text" name={'idForDeletion'} />
            </div>
      <CreateButton title={`Delete ` + name} onClick={(e) => {
          e.preventDefault();
          let element = document.getElementById('idForDeletion') as HTMLInputElement;
          const id = element.value;
          element.value = '';
          SendDeleteRequest(name.toLowerCase() + '/' + id, {}, setResponse);
        }} />
      </form>
    </div>
  );

}

function generatePostForm(fields: string[], name: string, setResponse: Function): any {
  return (
    <div style = {{justifyContent: "center", display: "flex", flexDirection: "column", width: "15%", margin: "0 auto"}}>
      <form>
        <br />
        <br />
        <div> Post {name} </div>
        {fields.map((field, index) => {
          return (
            <div key={index} style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: "10px"}}>
              <label style={{margin: "2px"}}>{field}</label>
              <input id={field} type="text" name={field} />
            </div>
          );
        })}
        <CreateButton title={`Post ` + name} onClick={(e) => {
          e.preventDefault();
          let body: any = {};
          fields.forEach((field) => {
            let element = document.getElementById(field) as HTMLInputElement;
            body[field] = element.value;
            element.value = '';
          });
          SendPostRequest(name.toLowerCase(), body, setResponse);
        }} />
      </form>
    </div>
  );
}

function generatePatchForm(fields: string[], name: string, setResponse: Function): any {
  return (
    <div style = {{justifyContent: "center", display: "flex", flexDirection: "column", width: "15%", margin: "0 auto"}}>
      <form>
        <br />
        <br />
        <div> Edit {name} </div>
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: "10px"}}>
          <label style={{margin: "2px"}}>id</label>
          <input id='patch_id' type="text" name='patchId' />
        </div>
        {fields.map((field, index) => {
          return (
            <div key={index} style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: "10px"}}>
              <label style={{margin: "2px"}}>{field}</label>
              <input id={`patch_${field}`} type="text" name={field} />
            </div>
          );
        })}
        <CreateButton title={`Edit ` + name} onClick={(e) => {
          e.preventDefault();
          let body: any = {};
          fields.forEach((field) => {
            let element = document.getElementById(`patch_${field}`) as HTMLInputElement;
            body[field] = element.value;
            element.value = '';
          });
          let element = document.getElementById('patch_id') as HTMLInputElement;
          body['id'] = element.value;
          element.value = '';
          SendPatchRequest(name.toLowerCase() + '/' + body['id'], body, setResponse);
        }} />
      </form>
    </div>
  );

}

function Page({ name }: { name: string }) {
  const [objects, setObjects] = useState([]);
  const [response, setResponse] = useState({});
  const [fields, setFields] = useState([]);
  SendGetRequest(`fields/${name.toLowerCase()}`, setFields);
  return (
    <div>
      <div>{ <strong>{name}</strong> }</div>
      <br />
      <div>
        <div style={{margin: 'auto', display: 'inline-block'}}>
            <table>
                <tr>
                    { (() => {
                        if (objects.length > 0) {
                            return Object.keys(objects[0]).map((key, index) => <th key={index}>{key}</th>);
                        } else {
                          return <div> No {name} </div>;
                        }
                    })() }
                </tr>
                {objects.map((object, index) => <tr key={index}>{
                    Object.keys(object).map((key, index) => <td key={index}>{object[key]}</td>)
                }</tr>)}
            </table>
        </div>
      </div>
      <br />
      <CreateButton title={`Get ` + name} onClick={(e) => {
          e.preventDefault();
          SendGetRequest(name.toLowerCase(), setObjects);
        }} />
      <div>{ getMessage(response) }</div>
      { generatePostForm(fields, name, setResponse) }
      { generateDeleteForm(name, setResponse) }
      { generatePatchForm(fields, name, setResponse) }
      <br />
      <br />
      <CreateButton title={`Import ` + name + ` from csv`} onClick={(e) => {
          e.preventDefault();
          SendPostRequest(name.toLowerCase() + `/from-csv`, {}, setResponse);
        }} />
      <br />
      <br />
      <CreateButton title={`Drop ` + name + ` table`} onClick={(e) => {
          e.preventDefault();
          SendDeleteRequest(name.toLowerCase(), {}, setResponse);
        }} />
    </div>
  );
}

export default Page;
