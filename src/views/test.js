import { Button } from 'antd'
import React, {useState, useEffect} from 'react'

const Error2 = () => {
	const [val, set] = useState("");
	const [phrase, setPhrase] = useState("example phrase");

	const createPhrase = () => {
		setPhrase(val);
		set("");
	};

	useEffect(() => {
		console.log(`typing "${val}"`);
	});

	useEffect(() => {
		console.log(`saved phrase: "${phrase}"`);
	});

	return (
		<>
		<label>Favorite phrase:</label>
		<input
			value={val}
			placeholder={phrase}
			onChange={e => set(e.target.value)}
		/>
		<button onClick={createPhrase}>send</button>
		</>
	);
}

class Button2 extends React.Component {
  constructor(props) {
      super(props);
      this.state = {data: 0};
      this.setNewNumber = this.setNewNumber.bind(this);
  }
  
  setNewNumber() {
    this.setState({data: this.state.data + 1})
  }
  render() {
      return (
         <div>
            <button onClick = {this.setNewNumber}>INCREMENT</button>
            <Content myNumber = {this.state.data}></Content>
         </div>
      );
    }
}
 
 
class Content extends React.Component {
  componentWillMount() {
      console.log('Component WILL MOUNT!')
  }
  componentDidMount() {
       console.log('Component DID MOUNT!')
  }
  componentWillReceiveProps(newProps) {
        console.log('Component WILL RECEIVE PROPS!')
  }
  shouldComponentUpdate(newProps, newState) {
        return true;
  }
  componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
  }
  componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
  }
  componentWillUnmount() {
         console.log('Component WILL UNMOUNT!')
  }
 
    render() {
      return (
        <div>
          <h3>{this.props.myNumber}</h3>
        </div>
      );
    }
}

class Error extends React.Component{
	constructor(props){
		super()
		this.state = {
			count: 0
		}
		this.increase = this.increase.bind(this)
	}
	increase(){
		this.setState({
			count: this.state.count+1
		})
	}

	render(){
		return (
			<>
				
				<Button2/>
			</>
		)
	}
}

class Count extends React.Component{
	constructor(props){
		super(props)
		
	}
	componentWillMount(){
		console.log('componentWillMount')
	}
	componentDidMount(){
		console.log('componentDidMount')
	}
	componentWillReceiveProps(){
		console.log('componentWillReceiveProps')
	}
	shouldComponentUpdate(){
		console.log('shouldComponentUpdate')
	}
	componentWillUpdate(){
		console.log('componentWillUpdate')
	}
	
	render(){console.log('render')
		return (
			<>
				<div>{this.props.count}</div>
				<Button onClick={this.props.onIncrease}>增加</Button>
			</>
		)
	}
}

export default Error