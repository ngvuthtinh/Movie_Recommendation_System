import './styles/App.css'
import DetailMovie_1 from './components/DetailMovie_1'
import DetailMovie_2 from './components/DetailMovie_2'
function App() {
  return (
    <>
      <div className="mb-10">
        <DetailMovie_1 />
      </div>
      <div className="mt-10">
        <DetailMovie_2 />
      </div>
    </>
  )
}

export default App