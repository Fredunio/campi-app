import {Dialog} from '@capacitor/dialog';

const showAlert = async () => {
    await Dialog.alert({
        title: 'Stop',
        message: 'this is an error',
    });
};

const showConfirm = async () => {
    const {value} = await Dialog.confirm({
        title: 'Confirm',
        message: `Are you sure you'd like to press the red button?`,
    });

    console.log('Confirmed:', value);
};

const showPrompt = async () => {
    const {value, cancelled} = await Dialog.prompt({
        title: 'Hello',
        message: `What's your name?`,
    });

    console.log('Name:', value);
    console.log('Cancelled:', cancelled);
};