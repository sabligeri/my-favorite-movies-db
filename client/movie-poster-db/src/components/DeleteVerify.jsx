function DeleteVerify({ deleteMovie, closeModal }) {
  
    return (
        <>
            <div >
                <h1>Do you really want to delete from favorites? </h1>
                <button onClick={deleteMovie} > Yes, sure </button>
                <button onClick={() => closeModal(false)}> No, thanks </button>
            </div>
        </>
    )
}

export default DeleteVerify;