import React, {Component} from 'react';
import axios from 'axios'
import Article from "../components/Article";
import CustomForm from "../components/Form";


class ArticleListView extends Component {
    state = {
        articles: []
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/')
            .then(res => {
                this.setState({
                    articles: res.data
                })

            })
    }

    render() {
        return (
            <div>
                <Article data={this.state.articles}/>
                <br/>
                <h2>Create article</h2>
                <CustomForm
                    requestType='post'
                    articleID={null}
                    btnText='create'
                />
            </div>
        );
    }
}

export default ArticleListView;