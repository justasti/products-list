export const NewProductForm = () => {
  return (
    <form>
      <div>
        <label htmlFor='product'>Product name:</label>
        <input type='text' name='product' id='product' />
      </div>
      <div>
        <input type='submit' value='Create' />
      </div>
    </form>
  )
}
