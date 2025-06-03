import { Register } from "../Register/Register"

export const RegisterModal = () => {

    return(
<>



<div classNameName="modal" tabindex="-1">
  <div className="modal-dialog modal-lg  bg-danger">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close fs-4" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body mb-5">
        <Register/>
      </div>
    </div>
  </div>
</div>


</>
    )


}