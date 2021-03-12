import { Button } from 'antd'
import React, {useState, useEffect, useLayoutEffect, memo, useCallback, useMemo} from 'react'
import ReactMarkdown from "react-markdown";

function useFetch(uri) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uri) return;
    fetch(uri)
      .then(data => data.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError);
  }, [uri]);

  return {
    loading,
    data,
    error
  };
}

function Fetch({
  uri,
  renderSuccess,
  loadingFallback = <p>loading...</p>,
  renderError = error => (
    <pre>{JSON.stringify(error, null, 2)}</pre>
  )
}) {
  const { loading, data, error } = useFetch(uri);
  if (loading) return loadingFallback;
  if (error) return renderError(error);
  if (data) return renderSuccess({ data });
}

const useIterator2 = (
  items = [],
  initialIndex = 0
) => {
  const [i, setIndex] = useState(initialIndex);

  const prev = () => {
    if (i === 0) return setIndex(items.length - 1);
    setIndex(i - 1);
  };

  const next = () => {
    if (i === items.length - 1) return setIndex(0);
    setIndex(i + 1);
  };
	
  return [items[i], prev, next];
};

const useIterator = (
  items = [],
  initialValue = 0
) => {
  const [i, setIndex] = useState(initialValue);

  const prev = useCallback(() => {
    if (i === 0) return setIndex(items.length - 1);
    setIndex(i - 1);
  }, [i]);

  const next = useCallback(() => {
    if (i === items.length - 1) return setIndex(0);
    setIndex(i + 1);
  }, [i]);

  const item = useMemo(() => items[i], [i]);
	
  return [item || items[0], prev, next];
};

const loadReadme = async (login, repo) => {
  const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
  const { download_url } = await fetch(uri).then(res =>
    res.json()
  );
  const markdown = await fetch(download_url).then(res =>
    res.text()
  );

  console.log(`Markdown for ${repo}\n\n${markdown}`);
};

function RepositoryReadme({ repo, login }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [markdown, setMarkdown] = useState("");

  const loadReadme = useCallback(async (login, repo) => {
    setLoading(true);
    const uri = `https://api.github.com/repos/${login}/${repo}/readme`;
    const { download_url } = await fetch(uri).then(res =>
      res.json()
    );
    const markdown = await fetch(download_url).then(res =>
      res.text()
    );
    setMarkdown(markdown);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!repo || !login) return;
    loadReadme(login, repo).catch(setError);
  }, [repo]);

  if (error)
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  if (loading) return <p>Loading...</p>;

  return <ReactMarkdown source={markdown} />;
}
function RepoMenu({ repositories, login }) {
  const [{ name }, previous, next] = useIterator(
    repositories
  );
  return (
    <>
      <div style={{ display: "flex" }}>
        <button onClick={previous}>&lt;</button>
        <p>{name}</p>
        <button onClick={next}>&gt;</button>
      </div>
      <RepositoryReadme login={login} repo={name} />
    </>
  );
}


function UserRepositories({
  login,
  selectedRepo,
  onSelect = f => f
}) {
  return (
    <Fetch
      uri={`https://api.github.com/users/${login}/repos`}
      renderSuccess={({ data }) => (
        <RepoMenu
					repositories={data}
					login={login}
          selectedRepo={selectedRepo}
          onSelect={onSelect}
        />
      )}
    />
  );
}
function GitHubUser({ login }) {
	const [letter, previous, next] = useIterator([
		"a",
		"b",
		"c"
	]);
	useEffect(()=>{
		console.log(letter)
		//next()
	})
	
  return (
		<>
    <Fetch
      uri={`https://api.github.com/users/${login}`}
      renderSuccess={UserDetails}
    />
		</>
  );
}

function UserDetails({ data }) {
  return (
    <div className="githubUser">
      <img src={data.avatar_url} alt={data.login} style={{ width: 200 }} />
      <div>
        <h1>{data.login}</h1>
        {data.name && <p>{data.name}</p>}
        {data.location && <p>{data.location}</p>}
      </div>
      <UserRepositories
        login={data.login}
        onSelect={repoName => console.log(`${repoName} selected`)}
      />
    </div>
  );
} 




const Error = () => {
	
  return (
    <>
      <GitHubUser login="janetwu"/>
    </>
  );
}

class Error2 extends React.Component{
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
				
				<Count count={this.state.count} onIncrease={this.increase} />
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
	static getDerivedStateFromProps(nextProps, prevState) {
		console.log('getDerivedStateFromProps')
		
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