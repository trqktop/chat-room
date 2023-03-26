import { connect, disconnect } from './store';






export const soketMideware = (state: any) => (next: any) => (action: any) => {
    const { chat } = state.getState()
    const { events, users }: any = { ...chat }
    const { isConnect }: any = { ...events }
    next(action)
}
