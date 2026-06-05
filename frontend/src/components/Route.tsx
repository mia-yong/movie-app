interface Props {
    children: React.ReactNode;
    regex: string;
}

const Route = (props: Props) => new RegExp(`^${props.regex}$`).test(location.pathname) && props.children;

export default Route;
