import React, { Component } from 'react'
import './App.css'

class MemeGenerator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: "http://i.imgflip.com/1bij.jpg",
            data: []
        }
    }
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    data: result.data.memes
                })
            })
    }
    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const randomNum = Math.floor(Math.random() * this.state.data.length)
        const randomMemeImg = this.state.data[randomNum].url
        this.setState({
            randomImg: randomMemeImg
        })
    }
    render() {
        
        return (
            <>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <input className='inputText' type="text" name='topText' onChange={this.handleChange} />
                        <input className='inputText' type="text" name='bottomText' onChange={this.handleChange} />
                        <input className="button" type="submit" value="Meme" />
                    </form>
                    <div className="randomWrapper">
                        <img className='randomimg' src={this.state.randomImg} alt='' />
                        <h2 className="toptext">{this.state.topText}</h2>
                        <h2 className="bottomtext">{this.state.bottomText}</h2>

                    </div>
                </div>
            </>
        )
    }
}

export default MemeGenerator 