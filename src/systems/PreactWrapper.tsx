import { h, Component } from 'preact';

export interface AppProps {
    items: any[];
    x: number;
    y: number;
}
interface AppState {}

export class PreactWrapper extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
    }
    render(props: AppProps, state: AppState) {
        return (
            <div style={{ top: this.props.y, left: this.props.x }}>
                {this.props.items.map(item => <div>{item}</div>)}
            </div>
        );
    }
}
