import "./style.css";

type iInputParam = {
    placeholder: string,
    icon?: string,
    id?: string,
    type?: string,
    style?: any,
    value?: string,
    onChange?: any,
    required?: boolean,
    pattern?: string
}
export default function Input({ placeholder, icon, ...props }: iInputParam) {

    return (
        <div className="input__container" style={{ ...props.style }}>
            {icon ? (
                <img src={icon} className='input__icon' alt='' />
            ) : ( <></> )}
            <input
                className="input__input-tag"
                type={props.type || ''}
                id={props.id || ''}
                placeholder={placeholder ? placeholder : ''}
                required={props.required || false}
                onChange={props.onChange}
                pattern={props.pattern}
            />
        </div>
    )
}

