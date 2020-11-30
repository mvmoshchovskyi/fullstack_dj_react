import React, {Component} from 'react';
import axios from 'axios'

class CustomForm extends Component {


    handleFormSubmit = (event, requestType, articleID) => {

        event.preventDefault()
        const title = event.target.elements.title.value
        const content = event.target.elements.content.value
        console.log('Hello', title, content);

        switch (requestType) {
            case 'post':
               return  axios.post(`http://127.0.0.1:8000/api/`, {
                    title: title,
                    content: content
                })
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
            case 'put':
              return   axios.put(`http://127.0.0.1:8000/api/${articleID}`, {
                    title: title,
                    content: content
                })
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
        }
    }

    render() {

        return (
            <div>
                <form onSubmit={(event)=>{
                    this.handleFormSubmit(event, this.props.requestType, this.props.articleID)}}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">title</label>
                        <input
                            name='title'
                            type="text" className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">content</label>
                        <input name='content'
                               type="text"
                               className="form-control"/>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >{this.props.btnText}
                    </button>
                </form>
            </div>

        )
    }
}

export default CustomForm



