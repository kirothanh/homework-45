/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
export default function FCommonTable({
  rows,
  columns,
  handleEditUser,
  handleDeleteUser,
}) {
  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => {
                if (column === "action") {
                  return (
                    <td key={`${index}${column}`}>
                      <button onClick={() => handleEditUser(row.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeleteUser(row.id)}>
                        Delete
                      </button>
                    </td>
                  );
                }
                return <td key={`${index}${column}`}>{row[column]}</td>;
              })}
            </tr>
          ))}
          {/* <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
              </tr>
              <tr>
                  <td>F88</td>
                  <td>F88@test</td>
                  <td>VN</td>
              </tr> 
          */}
        </tbody>
      </table>
    </>
  );
}
