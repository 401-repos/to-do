const Auth = (props) => {
    if (props.condition) {
        return (<>
            { [props.children] }
        </>
        )
    } else {
        return (
            <>{null}</>
            )
    }
}

export default Auth;