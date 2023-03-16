import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Footer(){
    return (
        <div className="d-flex justify-content-center justify-content-sm-start px-4" style={{fontSize: '14px'}}>
            <p>Made with <FavoriteIcon sx={{color : "#E90064", fontSize: '16px'}}/> by Prateek Mahajan</p>
        </div>
    )
}