import React, {Component} from 'react';
import axios from 'axios'

import {Card, Button} from 'antd'
import CustomForm from "../components/Form";

class ArticleDetail extends Component {
    state = {
        article: {}
    }

    componentDidMount(id) {
        const articleID = this.props.match.params.articleID
        axios.get(`http://127.0.0.1:8000/api/${articleID}`)
            .then(res => {
                this.setState({
                    article: res.data
                })
                console.log(res.data);
            })
    }

    handleDelete = (event) => {
        const articleID = this.props.match.params.articleID
        axios.delete(`http://127.0.0.1:8000/api/${articleID}`)
        this.props.history.push('/')
        // this.forceUpdate()
    }

    render() {
        return (
            <div>
                <Card
                    title={this.state.title}
                >
                    <p>{this.state.article.content}</p>
                </Card>
                <CustomForm
                    requestType='put'
                    articleID={this.props.match.params.articleID}
                    btnText='update'
                />
                <form onSubmit={this.handleDelete}>
                    <Button type='danger' htmlType='submit'> DELETE</Button>
                </form>
            </div>
        );
    }
}

export default ArticleDetail;