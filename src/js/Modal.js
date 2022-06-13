import {Component, formElementsDeclaration} from "./Componet";
import { Form } from "./Form";
import { findElement, hideLoginBtn, makeRequest, visitorList } from "./main";
import {Input, Select, Button} from './modalComponent'
import { Visit, VisitCardiologist, VisitDantist, VisitTherapist } from "./Visit";



class Modal extends Component{
    constructor(userData){
        super(userData)
    }
    render(elementData, parent){
        super.render(elementData, parent);
        const header = elementData.header;
        const title = document.createElement('div');
        title.classList.add('modal__title');
        title.innerHTML = `<h5 class="modal__title-text">${header}:</h5>
                            <button class="close-btn btn btn-close close__modal" type="button"></button>`
        const body = document.createElement('div');
        body.classList.add('modal__body');
        const footer = document.createElement('div');
        footer.classList.add('modal__footer');
        footer.innerHTML = `<button type="button" class="btn btn-primary submit-btn">Створити</button>`
        this.elementById.append(title, body, footer);
        this.closeBtn()
    }
    
    closeBtn(){
        const closeBtn = document.querySelector('.close__modal');
        closeBtn.addEventListener('click', (e)=>{
            this.remove()
        })
    }
    
    
}

class LoginModal extends Modal{
    constructor(userData){
        super(userData)
    }
    render(elementData, parent){
        super.render(elementData, parent);
        const inputPass = new Input();
        const inputEmail = new Input();
        const body = document.querySelector('.modal__body');
        inputEmail.render(findElement(formElementsDeclaration, 'LoginEmail'), body);
        inputPass.render(findElement(formElementsDeclaration, 'LoginPassword'), body);
        this.submit();
    }
    submit(){
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.addEventListener('click', (e)=>{
            let email = document.querySelector('#email')
            let pass = document.querySelector('#password')
            localStorage.setItem("email", email.value)
            localStorage.setItem("password", pass.value)
            this.remove()
            hideLoginBtn()
        })
    }
}

class DoctorModal extends Modal{
    constructor(userData){
        super(userData);
    }
    render(elementData, parent){
        super.render(elementData, parent);
        const selectDoctor = new Select();
        const body = document.querySelector('.modal__body');
        const patientData = document.createElement('form');
        patientData.classList.add('patient-data', 'top-15');
        patientData.setAttribute('name', 'patient-data');
        selectDoctor.render(findElement(formElementsDeclaration, 'SelectDoctor'), body);
        body.append(patientData);
        this.chooseDoctor();
        this.submit();
    }
    renderDoctorInput(){
        const rootPatientData = document.querySelector('.patient-data');
        rootPatientData.innerHTML = '';
        const visitTarget = new Input();
        const visitDescr = new Input();
        const visitUrgent = new Select();
        const visitorName = new Input();
        visitTarget.render(findElement(formElementsDeclaration, 'VisitTarget'), rootPatientData);
        visitDescr.render(findElement(formElementsDeclaration, 'VisitDescription'), rootPatientData);
        visitUrgent.render(findElement(formElementsDeclaration, 'VisitUrgency'), rootPatientData);
        visitorName.render(findElement(formElementsDeclaration, 'VisitorName'), rootPatientData);
    }
    renderCardiologist(){
        const rootPatientData = document.querySelector('.patient-data');
        this.renderDoctorInput();
        const bloodPressure = new Input();
        const bmi = new Input();
        const heartDisease = new Input();
        const age = new Input();
        bloodPressure.render(findElement(formElementsDeclaration, 'VisitorBloodPressure'), rootPatientData);
        bmi.render(findElement(formElementsDeclaration, 'VisitorBMI'), rootPatientData);
        heartDisease.render(findElement(formElementsDeclaration, 'VisitorHeartDisease'), rootPatientData);
        age.render(findElement(formElementsDeclaration, 'VisitorAge'), rootPatientData);

    }
    renderDantist(){
        const rootPatientData = document.querySelector('.patient-data');
        this.renderDoctorInput();
        const lastSeance = new Input();
        lastSeance.render(findElement(formElementsDeclaration, 'VisitorLastSeance'), rootPatientData)
    }
    renderTherapist(){
        const rootPatientData = document.querySelector('.patient-data');
        this.renderDoctorInput();
        const age = new Input();
        age.render(findElement(formElementsDeclaration, 'VisitorAge'), rootPatientData)
    }
    chooseDoctor(){
        const select = document.querySelector('.select__doctor');
        select.addEventListener('change', (e)=>{
            switch (select.value) {
                case 'cardiologist':
                    this.renderCardiologist()
                    break;
                case 'dantist':
                    this.renderDantist()
                    break;
                case 'therapist':
                    this.renderTherapist()
                    break;
                default:
                    break;
            }
        })
    }
    getPatientData(){
        const patientDataForm = document.querySelector('[name="patient-data"]');
        const doctor = document.querySelector('.select__doctor');
        const patientDataArr = [...patientDataForm.elements];
        const patientDataObj = {doctor: doctor.value};
        patientDataArr.forEach(el=>{
            patientDataObj[el.name] = el.value;
        })
        return patientDataObj;
    }
    submit(){
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.addEventListener('click', async (e)=>{
            
            let request = makeRequest('https://ajax.test-danit.com/api/v2/cards', this.getPatientData(), 'POST');
            let cardData = await request;
            console.log(cardData);
            if (cardData.hasOwnProperty('id')) {
                visitorList.push(cardData)
                let root = document.querySelector('.card__root>.container');
                switch (cardData.doctor) {
                    case 'cardiologist':
                        new VisitCardiologist(cardData).render(addUserIdToElementData(cardData, findElement(formElementsDeclaration, 'VisitCard')), root);
                        break;
                    case 'dantist':
                        new VisitDantist(cardData).render(addUserIdToElementData(cardData, findElement(formElementsDeclaration, 'VisitCard')), root);
                        break;
                    case 'therapist':
                        new VisitTherapist(cardData).render(addUserIdToElementData(cardData, findElement(formElementsDeclaration, 'VisitCard')), root);
                        break;
                    default:
                        break;
                }
                
                this.remove()
            }
        })
    }
}
function addUserIdToElementData(userData, elementData) {
    return {...elementData, attributes: {id: userData.id}}
}

export{
    Modal,
    LoginModal,
    DoctorModal
}

