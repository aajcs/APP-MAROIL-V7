import React, { useContext, useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { CajaChicaContext } from '../contexts/CajaChicaContext'
import moment from 'moment'
import CajaChicaForm from './CajaChicaForm'

const HomeCajaChicaVueltoList = () => {
  const { cajaChicas, deleteCajaChica, loading } = useContext(CajaChicaContext)
  console.log(cajaChicas)
  const [cajaChica, setCajaChica] = useState(cajaChicas)
  const [aceptarCajaChica, setAceptarCajaChica] = useState(cajaChicas)
  const [deleteCajaChicaDialog, setDeleteCajaChicaDialog] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const dt = useRef(null)
  const toast = useRef(null)

  useEffect(
    () => {
      const cajaChicasFilter = cajaChicas.filter(
        (p) => p.estatusVueltoCajaChica === 'PENDIENTE'
      )
      setCajaChica(cajaChicasFilter)
    },
    // setDataPresupuesto(dataPresupuestos)
    [cajaChicas]
  )
  const datefechaCajaChica = (rowData) => {
    const fecha = moment(rowData.fechaCajaChica)
    return fecha.format('dddDD/MM/YY HH:mm ')
  }

  const eliminarCajaChica = () => {
    deleteCajaChica(cajaChica.id)
    setDeleteCajaChicaDialog(false)
    toast.current.show({
      severity: 'error',
      summary: 'Eliminar',
      detail: 'CajaChica Eliminado',
      life: 3000
    })
  }

  const deleteCajaChicaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteCajaChicaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarCajaChica()}
      />
    </>
  )

  const confirmDeleteCajaChica = (CajaChica) => {
    setAceptarCajaChica(CajaChica)
    setDeleteCajaChicaDialog(true)
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-check-circle"
          className="p-button-rounded  p-button-success"
          onClick={() => confirmDeleteCajaChica(rowData)}
        />
      </div>
    )
  }

  const clearSelected = () => {
    setDeleteCajaChicaDialog(false)
  }

  return (
    <>
      <Toast ref={toast} />

      <DataTable
        ref={dt}
        value={cajaChica}
        // onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} CajaChicas"
        emptyMessage="No hay CajaChicas."
        sortField="CajaChicaCreado"
        sortOrder={-1}
        loading={loading}
        responsiveLayout="scroll"
        breakpoint="960px"
      >
        <Column
          field="fechaCajaChica"
          header="Fecha"
          body={datefechaCajaChica}
          dataType="date"
          sortable
        />

        <Column field="codigoCajaChica" header="Codigo" sortable />

        <Column
          field="montoVueltoCajaChica"
          header="Cambio Pendiente"
          sortable
        />
        {/* <Column
          field="estatusVueltoCajaChica"
          header="Estatus Vuelto"
          sortable
        /> */}
        <Column body={actionBodyTemplate}></Column>
      </DataTable>

      <CajaChicaForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteCajaChicaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteCajaChicaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {aceptarCajaChica && (
            <span>
              Esta seguro que quiere eliminar la CajaChica{' '}
              <b>{aceptarCajaChica.codigoCajaChica}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}

export default HomeCajaChicaVueltoList
