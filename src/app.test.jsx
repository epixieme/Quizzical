import {render,screen} from "@testing-library/react"
import App from './App'
describe('App', ()=>{
    it('should have the quizzical headline', ()=>{
        render(<App />);
        expect(screen.getAllByText(/Quizzical/i)).toBeInTheDocument;
    });
     it ('renders without crashing', ()=>{
        const {container} = render(<App />);
        expect(container).toBeInTheDocument();
      })
      it ('should have a start button', ()=>{
        render(<App />);
        expect(screen.getAllByText(/Start Here/i)).toBeInTheDocument;
      })

})