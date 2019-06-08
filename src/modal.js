import React, { Component } from 'react';
import './modal.css';

class AttributionModal extends Component {
	render() {
		return (
			<div className="modal fade" id="attributionModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
			  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <p className="modal-title title-attr" id="exampleModalScrollableTitle">Attribution</p>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">
			        <div className='attr-group'>Freepik</div>
			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Landing page image
			        </div>
			        <div className='attr-item attr-link'>
			        	<a href="https://www.freepik.com/free-photos-vectors/flower">Flower vector created by freepik - www.freepik.com</a>
			        </div>
			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Bear 404 error image
			        </div>
			        <div className='attr-item attr-link'>
			        	<a href="https://www.freepik.com/free-photos-vectors/background">Background vector created by freepik - www.freepik.com</a>
			        </div>

			        <div className='attr-group'>Icons8</div>
			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	<a href="https://icons8.com/icon/21322/checkmark">Checkmark icon by Icons8</a>
			        </div>
			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	<a href="https://icons8.com/icon/22922/delete">Delete icon by Icons8</a>
			        </div>
			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	<a href="https://icons8.com/icon/30157/no-entry">No Entry icon by Icons8</a>
			        </div>
			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	<a href="https://icons8.com/icon/21344/error">Error icon by Icons8</a>
			        </div>
			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	<a href="https://icons8.com/icon/21085/info">Info icon by Icons8</a>
			        </div>
			        
			        <div className='attr-group'>Flaticon</div>

			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Web Logo
			        </div>
			        <div className='attr-item attr-link'>Icons made by <a href="https://www.freepik.com/" 
			        	title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 
			        	title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Return Icon
			        </div>
			        <div className='attr-item attr-link'>Icons made by <a href="https://www.flaticon.com/authors/google" 
			        					title="Google">Google</a> 
			        	from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Sun Icon
			        </div>
			        <div className='attr-item attr-link'>
			        	Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" 
			        					title="Pixel perfect">Pixel perfect</a> 
			        	from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Camp Icon
			        </div>
			        <div className='attr-item attr-link'>Icons made by <a href="https://www.flaticon.com/authors/flat-icons" 
			        					title="Flat Icons">Flat Icons</a> 
			        	from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Visitor Icon
			        </div>
			        <div className='attr-item attr-link'>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> 
			        	from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Pawprint Icon
			        </div>
			        <div className='attr-item attr-link'>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> 
			        	from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Alert Icon
			        </div>
			        <div className='attr-item attr-link'>Icons made by <a href="https://www.flaticon.com/authors/smashicons" 
			        					title="Smashicons">Smashicons</a> 
			        	from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Mountain Icon
			        </div>
			        <div className='attr-item attr-link'>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> 
			        	from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Cloud Icon
			        </div>
			        <div className='attr-item attr-link'>Icons made by <a href="https://www.flaticon.com/authors/iconixar" 
			        					title="iconixar">iconixar</a> 
			        	from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			        <div className='attr-item attr-link'>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" 
			        					title="Darius Dan">Darius Dan</a> 
			        	from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			        <div className='attr-item'>
			        	<i className="fas fa-circle solid-dot-icon"></i>
			        	Search Icon
			        </div>
			        <div className='attr-item attr-link'>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> 
			        	from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> 
			        	is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a>
			        </div>

			      </div>
			    </div>
			  </div>
			</div>

		);
	}
}

export default AttributionModal;