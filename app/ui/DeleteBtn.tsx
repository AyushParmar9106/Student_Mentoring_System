'use client'

export default function DeleteBtn (props: any) {
  return (
    <>
      <button
        className='btn btn-outline-danger btn-sm w-40'
        onClick={async () => {
          // It's good practice to add a confirmation
          if (confirm('Are you sure?')) {
            await props.deleteFn(props.id)
          }
        }}
      >
        Delete
      </button>
    </>
  )
}
