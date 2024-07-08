const Persons = (props) => {
    return(
      <table>
        <tbody>
          {props.persons.map( person => (
            <tr key ={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={() => props.deletePerson(person.id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )

  }

export default Persons