import {render,screen} from "@testing-library/react"
import App from './App'
describe('App', ()=>{
    it('should have headline', ()=>{
        render(<App />);
        expect(screen.getAllByText(/Hello World/i)).toBeInTheDocument;
    });

})