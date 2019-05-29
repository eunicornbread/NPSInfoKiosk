<div className='web-name'>
					<h1 className='head-1'>National Park Service Info Kiosk</h1>
		        </div>

		        <button type="button" className="button shadow-sm" id="search-button" data-toggle="modal" data-target=".bd-example-modal-xl">
					<span className="button-text mr-2">Find a park</span>
                	<span className='button-icon'><i className="fas fa-chevron-circle-right"></i></span>
				</button>

				<div className="modal fade bd-example-modal-xl" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true" id="myModal">
				  <div className="modal-dialog modal-xl modal-dialog-centered">
				    <div className="modal-content">
				      <div className='modal-body-lg'>

				      	<button type="button" className="close close-button" data-dismiss="modal" 
							        	aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>

				{ /* Modal content start */ }
				<div className="filter-menu shadow" id="filter-menu">
					
					<div className="filter-wrapper" id="state-filter-wrapper" onClick={ this.handleStateCollapse }>
						<i className="fas fa-chevron-circle-right collapse-icon" id="state-collapse"></i>
						<div className="filter-button state-filter-button">
							<p className="noselect line-grow">Filter By State</p>
						</div>
						
						<div className="filter-option state-filter-option" id="state-filter-option">
							<div className="option-wrapper" id="state-wrapper">
								{ stateOptions }
							</div>
						</div>
					</div>

					<div className="filter-wrapper" id="desig-filter-wrapper" onClick={ this.handleDesigCollapse }>
						<i className="fas fa-chevron-circle-right collapse-icon" id="desig-collapse"></i>
						<div className="filter-button desig-filter-button">
							<p className="noselect line-grow">Filter By Designation</p>
						</div>
	
						<div className="filter-option desig-filter-option" id="desig-filter-option">
							<div className="option-wrapper" id="desig-wrapper">
								{ desigOptions }
							</div>
						</div>
					</div>

					<div className="filter-wrapper" id="search-filter-wrapper" onClick={ this.handleSearchCollapse }>
						<i className="fas fa-chevron-circle-right collapse-icon" id="search-collapse"></i>
						<div className="filter-button search-filter-button">
							<p className="noselect line-grow" id="search-filter">Search By Keyword</p>
						</div>

						<div className="filter-option search-filter-option" id="search-filter-option">
							<div className="option-wrapper-sm" id="search-wrapper">
								<div className="dropdown-item" id="dropdown-keyword"
									 onClick={ this.handleSearchFilter } data-search="Search By Keyword">
									<p data-search="Search By Keyword">Search By Keyword</p>
								</div>
								<div className="dropdown-item" id="dropdown-name"
									 onClick={ this.handleSearchFilter } data-search="Search By Name">
									<p data-search="Search By Name" id="search-by-name">Search By Name</p>
								</div>
							</div>
						</div>
					
					</div>
				</div>
				
				<div className="search-bar">
					<form onSubmit={ this.handleSearch }>
				    	<button type="submit" className="search-button">
				    		<i className="fas fa-search"></i>
				    	</button>
				    	<input type="text" className="search-input shadow-sm" id="search-input" 
				    			ref={(input) => this.textInput = input} placeholder="Find a park" />
					</form>
				</div>

				<div className="filter-group">
					{ stateFilterList }
					{ desigFilterList }
				</div>

				<div className="search-result" id="search-results">{ resultList }</div>
				{ /* Modal content end */ }

					  </div>
				    </div>
				  </div>
				</div>
				