import React, { useEffect, useState } from 'react';
import './style.css'
import { app } from '../firebaseInit'
import { getDatabase } from "firebase/database";

type mouseEvent = React.MouseEvent<HTMLImageElement>
type touchEvent = React.TouchEvent<HTMLImageElement>
interface iCarrossel {
    title: String;
}
export default function Carrossel({ title }: iCarrossel) {
    const database = getDatabase(app);

    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);

    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);

    const [currentIndex, setCurrentIndex] = useState(0);

    function touchStart(event: any, index: number): void {
        setCurrentIndex(index);
        setStartPosition(getPositionX(event));
        setIsDragging(true);
    }

    function touchMove(event: any): void {
        if (isDragging) {
            setCurrentPosition(getPositionX(event));
            setCurrentTranslate(prevTranslate + currentPosition - startPosition);
        }
    }

    function touchEnd(): void {
        setIsDragging(false);
        setPrevTranslate(currentTranslate)
    }

    return (
        <div className='carrossel__container'>
            <h2 className='carrossel__title'>{title}</h2>
            <div className='carrossel__slider-container'>
                <div className='carrossel__slider'
                    style={{ transform: `translateX(${currentTranslate}px)` }}
                    data-slider
                >
                    {test.map((image, index) => (
                        <div key={index}
                            className='slider__item'
                            data-item >
                            <img
                                className='slider__img'
                                src={image.imageUrl}
                                alt=''
                                onDragStart={preventDragImageEvent}
                                onTouchStart={(event) => touchStart(event, index)}
                                onMouseDown={(event) => touchStart(event, index)}

                                onTouchMove={(event) => touchMove(event)}
                                onMouseMove={(event) => touchMove(event)}

                                onTouchEnd={() => touchEnd()}
                                onMouseUp={() => touchEnd()}
                                onMouseLeave={() => touchEnd()}
                            />
                            <p className='slider__description'>{image.description}</p>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>

    )
}

function preventDragImageEvent(event: React.DragEvent<HTMLImageElement>): void {
    event.preventDefault();
}

function getPositionX(event: mouseEvent | touchEvent): number {
    return event.type.includes('mouse')
        ? (event as mouseEvent).pageX
        : (event as touchEvent).touches[0].clientX;
}

function isTooFar(): boolean {
    const slider: HTMLElement | null = document.querySelector('[data-slider]');
    console.log(slider?.clientWidth)
    return false;
}

// random picture
const test = [
    {
        description: 'descrição',
        imageUrl: 'arvore1.jpeg',
    }, {
        description: 'descrição',
        imageUrl: 'arvore2.jpeg',
    }, {
        description: 'descrição',
        imageUrl: 'arvore3.jpeg',
    }, {
        description: 'descrição',
        imageUrl: 'arvore4.jpeg',
    }, {
        description: 'descrição',
        imageUrl: 'arvore4.jpeg',
    }, {
        description: 'descrição',
        imageUrl: 'arvore4.jpeg',
    }, {
        description: 'descrição',
        imageUrl: 'arvore4.jpeg',
    },
]