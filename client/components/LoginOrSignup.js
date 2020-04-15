import React from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';
import { LogIn, SignUp } from '../components';

export default function() {
  return (
    <Modal open={true}>
      <Modal.Header>
	Welcome to Planche
      </Modal.Header>
      <Modal.Content>
	<Modal.Description>
	  <LogIn />
	  <SignUp />
	</Modal.Description>
      </Modal.Content>
    </Modal>
  )
};
