import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';


export default function Todo ()  {
  const [createissue, setCreateissue] = useState("");
  const [issues, setIssues] = useState([]);
  const [updateissue, setUpdateissue] = useState("");

  const createIssue = (event) => {
    console.log("イベント発火")
    axios.post('http://localhost:3001/issues',
      {
        name: createissue 
      }
    ).then(response => {
      console.log("registration response", response.data)
      setIssues([...issues, {
        id: response.data.id,
        name: response.data.name
      }])
      resetTextField()
    }).catch(error => {
      console.log("registration error", error)
    }).catch(data =>  {
      console.log(data)
    })
    event.preventDefault()
  }

  useEffect(()  =>  {
    async function fetchData()  {
      const result = await axios.get('http://localhost:3001/issues',)
        console.log(result)
        console.log(result.data)
        setIssues(result.data);
      }
      fetchData();
      }, []);

  const deleteIssue = (id) => {
    axios.delete(`http://localhost:3001/issues/${id}`)
    .then(response => {
      setIssues(issues.filter(x => x.id !== id))
      console.log("set")
    }).catch(data =>  {
      console.log(data)
    })
  }

  const updateIssue = (id) => {
    axios.patch(`http://localhost:3001/issues/${id}`,
    { 
      name: updateissue
    }
    ).then(response => {
      setIssues(issues.filter(x => x.id !== id))
      console.log(response.data)
    }).catch(data =>  {
      console.log(data)
    })
  }

  const resetTextField = () => {
    setCreateissue('')
  }
  const handleUpdate = (event) => {
    setUpdateissue(event.target.value)
  }

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs'>
        <CssBaseline/>
          <form onSubmit={createIssue}>
            <Input
                type="text"
                name="createissue"
                value={createissue}
                placeholder="Enter text"
                onChange={event => setCreateissue(event.target.value)}
            />
            <Button
              type="submit"
              variant='contained'
              color='primary'>
                つぶやく
            </Button>
          </form>
        <List
          style={{marginTop: '48px'}}
          component='ul'
        >
          {issues.map(item => (
            <ListItem key={item.id} component='li' >
              <Checkbox
                value='primary'
                onChange={() => deleteIssue(item.id)}
              />
              <ListItemText>
                Name:[{item.name}]
              </ListItemText>
              <ListItemSecondaryAction>
                <form>
                  <Input
                    type="text"
                    name="issue"
                    value={updateissue} 
                    onChange={event => handleUpdate(event)}
                  />
                  <Button
                    type="submit"
                    onClick={() => updateIssue(item.id)}
                  >
                    更新
                  </Button>
                </form>
              </ListItemSecondaryAction>              
            </ListItem>
          ))}
        </List>
      </Container>
    </React.Fragment>
  );
}