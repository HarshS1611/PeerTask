// any other web3 ui lib is also acceptable
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";



export default function SendNotif() {

    // send notification
    const sendNotification = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 1, // broadcast
            identityType: 2, // direct payload
            notification: {
                title: `[SDK-TEST] notification TITLE:`,
                body: `[sdk-test] notification BODY`
            },
            payload: {
                title: `[sdk-test] payload title`,
                body: `sample msg body`,
                cta: '',
                img: ''
            },
            channel: 'eip155:5:0x42082772D74F5E48E25f7663D98351C40A9CE9db', // your channel address
            env: 'staging'
        });
        console.log(apiResponse);
    }

    const getNotifications = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const notifications = await PushAPI.user.getFeeds({
            user: 'eip155:5:' + await signer.getAddress(), // user address in CAIP
            env: 'staging'
        });
        console.log(notifications);
        return notifications;
    }

    return (
        <>
            <div>
                <h1>Send Notif</h1>
                <button onClick={sendNotification}>Send</button>
            </div>
            <div>
                <h1>Get Notif</h1>
                <button onClick={getNotifications}>Get</button>

            </div>
        </>
    )
}