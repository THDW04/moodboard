import ReferenceForm from '../components/ReferenceForm'
import ReferenceFilters from '../components/Filters'

function AddReferencePage() {
  return (
    <section className="add-form-page moodly-layout">
      <ReferenceFilters
                categories={[]}
                selectedCategory=""
                search=""
                onCategoryChange={() => {}}
                onSearchChange={() => {}}
              />

      <div className="add-reference">
        <h2>Ajouter une inspiration</h2>
        <ReferenceForm />
      </div>
    </section>
  )
}

export default AddReferencePage