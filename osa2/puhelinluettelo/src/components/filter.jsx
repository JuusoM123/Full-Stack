const Filter = (props) => {
    return (
        <div>
            filter. Show persons with <input
            value={props.searchTerm}
            onChange={props.handleSearchChange}
            />
        </div>
    )
}

export default Filter