import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import { Button, Paper } from '@mui/material';

export default function Student() {
    const paperStyle={padding: '100px, 40px',width:600, margin:"20px auto"}
    const[name,setName]=React.useState('')
    const[address,setAddress]=React.useState('')
    const[student,setStudents]=React.useState([])
    
    const handleclick=(e)=>{
        e.preventDefault() 
        const student={name,address}
    console.log(student)
    fetch("https://testme-production.up.railway.app/student/add",{
     method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify(student)
    }).then(()=>{
        console.log("New Student Added")
    })
    window.location.reload(false);
}

React.useEffect(()=>{
    fetch("https://testme-production.up.railway.app/student/getall")
    .then(res=>res.json())
    .then((result)=>{
        setStudents(result);
    }
    )
},[])

  return (

    <Container>
    <Paper elevation={3} style={paperStyle}>
        <h1 style={{color:"blue"}}><u>Add Student</u></h1>


        
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1,  },
      }}
      noValidate
      autoComplete="off"
    >
        
      <TextField id="outlined-basic" label="student Name" variant="outlined" fullWidth
        value={name}
        onChange={(e)=>setName(e.target.value) }
      />
      <TextField id="outlined-basic" label="Student Adddress" variant="outlined" fullWidth
      value={address}
      onChange={(e)=>setAddress(e.target.value) }/>
      <Button size="medium" variant="contained" color="secondary"onClick={handleclick}>
      Submit
</Button>

    </Box>
    </Paper>
    
    <h1>Students</h1>

    <Paper elevation={3} style={paperStyle}>
        
        {student.map(student=>(

             <Paper elevation={6} style={{margin: "10px",padding:"15px", textAlign:"left"}} key={student.id}>
             Id:{student.id}<br/>
             Name:{student.name}<br/>
             Adddress:{student.address}<br/>
             </Paper>
        ))
}
    </Paper>
    </Container>
  );
}
