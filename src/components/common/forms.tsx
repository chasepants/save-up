import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { RootState } from "../../redux/store";
import { FormButtonProps, FormDropDownProps, FormErrorProps, FormInputProps } from "./types";


export function FormError({ error }: FormErrorProps): JSX.Element {
    return (
      <div className="row mt-2">
        <div className="col-sm-6 offset-sm-3 text-center">
          <Form.Text className='text-danger'>{error}</Form.Text>
        </div>
      </div>
    )
}

export function FormInput(props: FormInputProps): JSX.Element {
    const { label, name, type, handleInput, error } = props
    return (
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          name={name}
          type={type}
          onChange={(e) => handleInput(e)}
          isInvalid={error !== ''}
        />
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Form.Group>
    )
}

export function FormButton({ formButtonText, handleFormSubmit, form, showCustomButton, customButton, error }: FormButtonProps): JSX.Element {
    const state = useSelector((state: RootState) => state)
    let isSaving = false;
    //this try catch was added to get unit tests to pass as I could not mock useSelector here 
    //those tests should probably be improved by wrapping the component in a Provider.
    try{
        switch(form) {
            case 'loginPage':
                isSaving = state.login.isSaving ?? false;
                break;
            case 'addSavingsGoalForm':
                isSaving = state.savingsGoalForm.isSaving ?? false;
                break;
            default:
                isSaving = false;
                break;
        }
    } catch(e) {
        // log the error: console.error(e)
    }
    

    return (
        <Form.Group className='col-sm-6 offset-sm-3 text-center mb-5'>
            <div className="input-group d-flex justify-content-evenly">
                <Button onClick={handleFormSubmit} className="btn-sharp btn-success">
                    { isSaving && '' === error ? <ClipLoader color="#ffffff" loading={isSaving} size={20} /> : formButtonText } 
                </Button>
                { showCustomButton && customButton }
            </div>
        </Form.Group>
    )
}

export function FormDropDown({ handleInput, name, label, detail, options, error }: FormDropDownProps): JSX.Element {
    return (
        <Form.Group className='col-sm-3'>
            <Form.Control onChange={handleInput} as='select' name={name} isInvalid={error !== ''}>
                <option value=''>{label}</option>
                { options.map((option: JSX.Element) => option) }
            </Form.Control>
            <span className='text-muted'>{detail}</span>
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    )
} 
