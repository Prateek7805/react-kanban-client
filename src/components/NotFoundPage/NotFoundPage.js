import reloadPic from './reload-document.svg'

export default function NotFoundPage(){

    return (
        <div className="d-flex justify-content-center flex-column align-items-center p-3" style={{width: '100vw', height: '100vh'}}>
            <img src={reloadPic} width="120" height="120" alt="404 not found" />
            <p className='py-3'><b className='text-danger'>404!</b> The page does not exist</p>
        </div>
    )
}