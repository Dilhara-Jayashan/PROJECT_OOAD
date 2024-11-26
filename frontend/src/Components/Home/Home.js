import React from 'react';
import Admin from './img/admin.png'
import Client from './img/client.avif'
import Employee from './img/Employee Manager.avif'
import Inventory from './img/Inventory.jpg'
import './home.css'
function Home() {
    const saveToLocalStorage = (role) => {
        localStorage.setItem('role', role);
    };

    return (
        <div >
            <p className='topicmain'>SIMET MARK DASHBOARD</p>
            <div className='action_card_cointainer'>

                <div
                    className='action_card'
                    onClick={() => {
                        saveToLocalStorage('client manager');
                        window.location.href = '/clientLogin';
                    }}
                >
                    <img src={Client} alt='client' className='card_image' />
                    Client Manager
                </div>
                <div
                    className='action_card'
                    onClick={() => {
                        saveToLocalStorage('inventory manager');
                        window.location.href = '/inventoryLogin';
                    }}
                >
                    <img src={Inventory} alt='inventory' className='card_image' />
                    Inventory Manager
                </div>
                <div
                    className='action_card'
                    onClick={() => {
                        saveToLocalStorage('employee manager');
                        window.location.href = '/employeeLogin';
                    }}
                >
                    <img src={Employee} alt='Employee' className='card_image' />
                    Employee Manager
                </div>
                <div
                    className='action_card'
                    onClick={() => {
                        saveToLocalStorage('admin');
                        window.location.href = '/adminLogin';
                    }}
                >
                    <img src={Admin} alt='Admin' className='card_image' />
                    Admin
                </div>
            </div>
        </div>

    );
}

export default Home;
