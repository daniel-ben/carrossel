import React, { useEffect, useState } from 'react';
import './style.css'

type mouseEvent = React.MouseEvent<HTMLImageElement>
type touchEvent = React.TouchEvent<HTMLImageElement>
interface iCarrossel {
    carrossel: {
        title: string;
        items: {
            description: string;
            imageUrl: string;
        }[];
    }
}
export default function Carrossel({ carrossel }: iCarrossel) {
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
            <h2 className='carrossel__title'>{carrossel.title}</h2>
            <div className='carrossel__slider'
                style={{ transform: `translateX(${currentTranslate}px)` }}
                data-slider
            >
                {carrossel.items.map((item, index) => (
                    <div key={index}
                        className='slider__item'
                        data-item >
                        <img
                            className='slider__img'
                            src={item.imageUrl}
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
                        <p className='slider__description'>{item.description}</p>
                    </div>
                )
                )}
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
