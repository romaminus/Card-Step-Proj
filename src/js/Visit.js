import {Component, formElementsDeclaration} from './Componet'
import { findElement } from './main';
import { Button, Text } from './modalComponent';

// // Visit 


export class Visit extends Component {
    constructor(userData){
        super(userData)
    }
    render(elementData, parent){
        super.render(elementData, parent);
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card__header');
        cardHeader.innerHTML = `
            <p class="patient__name">${this.userData.name}</p>
            <button class="btn btn-close close__card" type="button"></button>`;
        const cardDoctor = document.createElement('p');
        cardDoctor.classList.add('patient__doctor');
        cardDoctor.textContent = `${this.userData.doctor}`;
        const cardMoreBtn = document.createElement('button');
        cardMoreBtn.classList.add('btn', 'more__btn');
        cardMoreBtn.textContent = 'Show More Info';
        const cardFull = document.createElement('div');
        cardFull.classList.add('card__full', 'hide');
        cardFull.innerHTML = `
            <p class="visit-target">${this.userData.visitTarget}</p>
            <p class="description">${this.userData.description}</p>
            <p class="selectedUrgency">${this.userData.selectedUrgency}</p>
            <p class="name">${this.userData.name}</p>`;
        const cardEditBtn = document.createElement('button');
        cardEditBtn.classList.add('btn', 'edit__btn');
        cardEditBtn.textContent = 'Edit';
        this.elementById.append(cardHeader, cardDoctor, cardMoreBtn, cardFull, cardEditBtn);
        
        this.onInfoBtn();
        this.onDelete();
        this.onEdit();
    }
    onInfoBtn(){
        const moreInfoBtn = document.querySelector('.more__btn');
        moreInfoBtn.addEventListener('click', (e)=>{
            const cardFullInfo = document.querySelector('.card__full');
            cardFullInfo.classList.toggle('hide')
        })
    }
    onDelete(){

    }
    onEdit(){

    }
}

export class VisitDantist extends Visit{
    constructor(userData){
        super(userData)
    }
    render(elementData, parent){
        super.render(elementData, parent);
        const cardFull = document.querySelector('.card__full')
        cardFull.innerHTML += `
            <p class="last-seance">${this.userData.lastSeance}</p>`;
    }
}

export class VisitTherapist extends Visit{
    constructor(userData){
        super(userData)
    }
    render(elementData, parent){
        super.render(elementData, parent);
        const cardFull = document.querySelector('.card__full')
        cardFull.innerHTML += `
            <p class="age">${this.userData.age}</p>`;
    }
}

export class VisitCardiologist extends Visit{
    constructor(userData){
        super(userData)
    }
    render(elementData, parent){
        super.render(elementData, parent);
        const cardFull = document.querySelector('.card__full')
        cardFull.innerHTML += `
            <p class="blood-pressure">${this.userData.bloodPressure}</p>
            <p class="BMI">${this.userData.BMI}</p>
            <p class="heart-disease">${this.userData.heartDisease}</p>
            <p class="age">${this.userData.age}</p>`;
    }
}

