import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';

export default () => {
  const [values, setValues] = useState({
    companyName: null,
    companyAddress: null,
    companyAddress2: null,
    companyPhone: null,
    companyEmail: null,
    companyWebsite: null,
  });

  return (
    <Card>
      <Title title="POSSystems" />
      <CardContent>
        <h3>{values.companyName}</h3>
        {values.companyAddress && <div>{values.companyAddress}</div>}
        {values.companyAddress2 && <div>{values.companyAddress2}</div>}
        {values.companyPhone && <div>{values.companyPhone}</div>}
        {values.companyEmail && <div>{values.companyEmail}</div>}
        {values.companyWebsite && <div>{values.companyWebsite}</div>}
      </CardContent>

      <CardContent>
        <div
          style={{
            fontSize: 10,
          }}
        >
          Developed by:
        </div>
        <div>
          <img className="img-thumbnail" src="/js/ignytek.png" width="100" />
        </div>
        <div
          style={{
            fontWeight: 'bold',
          }}
        >
          Ignytek
        </div>
      </CardContent>
    </Card>
  );
};
