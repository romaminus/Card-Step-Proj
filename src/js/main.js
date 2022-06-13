import '../styles/style.css';
import {Component, formElementsDeclaration} from './Componet';
import {Input, Select, Button, Text} from './modalComponent';
import {Modal, LoginModal, DoctorModal} from './Modal';
import { Visit } from './Visit';
// new Component().render(findElement(formElementsDeclaration, 'LoginModal'))
// new Input().render(findElement(formElementsDeclaration, 'LoginPassword'))
// new Text().render(findElement(formElementsDeclaration, 'Text'))

export const visitorList = [];
const TOKEN = 'f175d523-c881-4716-85cf-f3034d585ce0';
export async function makeRequest(url, body, method = 'GET') {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify(body)
        });
    return await response.json();
}
let loginBtn = document.querySelector('.login-btn');
let makeVisitBtn = document.querySelector('.visit-btn');
export function findElement(arr, param) {
    return arr.find(el => el.form === param)
}
export function hideLoginBtn() {
    if (localStorage.password && localStorage.email) {
        loginBtn.classList.add('hide');
        makeVisitBtn.classList.remove('hide');
    }else{
        loginBtn.classList.remove('hide');
        makeVisitBtn.classList.add('hide');
    }
}

hideLoginBtn()
let loginModal = new LoginModal();
loginBtn.addEventListener('click', (e)=>{
    loginModal.render(findElement(formElementsDeclaration, 'LoginModal'))
})
let doctorModal = new DoctorModal();
makeVisitBtn.addEventListener('click', (e)=>{
    doctorModal.render(findElement(formElementsDeclaration, 'DoctorModal'))
})
// new Visit(findElement(formElementsDeclaration, 'VisitCard')).render()

