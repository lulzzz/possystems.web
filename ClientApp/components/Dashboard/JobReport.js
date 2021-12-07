import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { httpClient } from '../../custom/authProvider';

class JobReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobRunning: false,
    };

    httpClient('api/jobsrunning', { method: 'GET' })
      .then(response => {
        this.setState({ jobRunning: response.json });
      })
      .catch(e => {
        console.error(e);
      });
  }

  render() {
    //console.log(this.state.jobRunning);
    return (
      <Card>
        {this.state.jobRunning ? <CardContent>Job Running</CardContent> : null}
      </Card>
    );
  }
}

export default JobReport;
