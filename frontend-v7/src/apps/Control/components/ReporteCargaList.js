/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, { useContext, useState, useRef, useEffect } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { Dialog } from 'primereact/dialog'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { ColumnGroup } from 'primereact/columngroup'
import { Row } from 'primereact/row'
import { MultiSelect } from 'primereact/multiselect'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { Dropdown } from 'primereact/dropdown'
import { BarcoContext } from '../contexts/BarcoContext'
import { ReporteCargaContext } from '../contexts/ReporteCargaContext'
import moment from 'moment'

import ReporteCargaForm from './ReporteCargaForm'

const ReporteCargaList = () => {
  const { reporteCargas, findReporteCarga, deleteReporteCarga, loading } =
    useContext(ReporteCargaContext)
  const { barcocargando, barcos } = useContext(BarcoContext)
  const [reporteCarga, setReporteCarga] = useState(reporteCargas)
  const [deleteReporteCargaDialog, setDeleteReporteCargaDialog] =
    useState(false)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [filters2, setFilters2] = useState({
    barco: { value: null, matchMode: FilterMatchMode.IN },
    gabarra: { value: null, matchMode: FilterMatchMode.EQUALS }
  })
  const [selecteBarco, setSelecteBarco] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState(null)
  const dt = useRef(null)
  const toast = useRef(null)
  const saveReporteCarga = (id) => {
    findReporteCarga(id)
    setIsVisible(true)
    // console.log(id);
  }

  const [estado, setEstado] = useState(null)
  const [selectedCity1, setSelectedCity1] = useState(null)

  const todosBarcos = barcos

  useEffect(() => {
    if (barcocargando) {
      setSelecteBarco(barcocargando)
      // setGlobalFilter(barcocargando.nombreBarco)
    }
  }, [barcocargando])
  // experimento de listar barco

  const onCityChange = (e) => {
    setSelectedCity1(e.value)
  }

  // setSelectedCity1(solounbarco[0])
  const onChangeBarco = (e) => {
    setSelecteBarco(e.value)
    e.value ? setGlobalFilter(e.value.nombreBarco) : setGlobalFilter(null)
  }
  const selectedBarcoTemplate = (option, props) => {
    if (option) {
      return (
        <div className="country-item country-item-value">
          {/* <img alt={option.name} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} /> */}
          <div>{option.nombreBarco}</div>
        </div>
      )
    }
    return <span>{props.placeholder}</span>
  }
  const countryOptionTemplate = (option) => {
    return (
      <div className="country-item">
        {/* <img alt={option.name} src="images/flag/flag_placeholder.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} className={`flag flag-${option.code.toLowerCase()}`} /> */}
        <div>{option.nombreBarco}</div>
      </div>
    )
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Nuevo"
            icon="pi pi-plus"
            className="p-button-success mr-2"
            onClick={() => setIsVisible(true)}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-button-danger"
          />
          <h5>Selecione un Barco</h5>

          <Dropdown
            value={selecteBarco}
            options={todosBarcos}
            onChange={onChangeBarco}
            optionLabel="nombreBarco"
            filter
            tabIndex="3"
            showClear
            filterBy="nombreBarco"
            placeholder="Seleciona el barco"
            valueTemplate={selectedBarcoTemplate || 'ver'}
            itemTemplate={countryOptionTemplate}
          />
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" /> */}
        <Button
          label="Export"
          icon="pi pi-upload"
          className="p-button-help"
          onClick={exportCSV}
        />
      </React.Fragment>
    )
  }
  const exportCSV = () => {
    dt.current.exportCSV()
  }

  const eliminarReporteCarga = () => {
    deleteReporteCarga(reporteCarga._id)
    setDeleteReporteCargaDialog(false)
    toast.current.show({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Updated',
      life: 3000
    })
  }
  const deleteReporteCargaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setDeleteReporteCargaDialog(false)}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => eliminarReporteCarga()}
      />
    </>
  )
  const confirmDeleteReporteCarga = (reporteCargas) => {
    setReporteCarga(reporteCargas)
    setDeleteReporteCargaDialog(true)
    // console.log(reporteCargas);
  }
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => saveReporteCarga(rowData.id)}
        />

        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteReporteCarga(rowData)}
        />
      </div>
    )
  }
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Barcos</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  )
  const clearSelected = () => {
    setDeleteReporteCargaDialog(false)
  }
  const fechaBodyTemplate1 = (rowData) => {
    const fecha = moment(rowData.reporteCargaCreado)
    return fecha.format('dddDD/MM/YY HH:mm:ss')
  }
  const fechaBodyTemplate2 = (rowData) => {
    const fecha = moment(rowData.reporteCargaModificado)
    return fecha.format('dddDD/MM/YY HH:mm:ss')
  }
  const lastYearTotal = () => {
    let total = 0
    for (let sale of reporteCargas) {
      total += sale.trenCargados
    }

    return total
  }

  const thisYearTotal = () => {
    let total = 0
    for (let sale of reporteCargas) {
      total += sale.toneladasCargadas
    }

    return total
  }
  let footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totales:"
          colSpan={2}
          footerStyle={{ textAlign: 'right' }}
        />
        <Column footer={lastYearTotal} />
        <Column />
        <Column footer={thisYearTotal} />
      </Row>
    </ColumnGroup>
  )
  const representatives = [
    { barco: 'a', image: 'amyelsner.png' },
    { barco: 'Anna Fali', image: 'annafali.png' },
    { barco: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { barco: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { barco: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { barco: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { barco: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { barco: 'Onyama Limba', image: 'onyamalimba.png' },
    { barco: 'Stephen Shaw', image: 'stephenshaw.png' },
    { barco: 'XuXue Feng', image: 'xuxuefeng.png' }
  ]

  const representativeRowFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        options={representatives}
        onChange={(e) => options.filterApplyCallback(e.value)}
        optionLabel="barco"
        placeholder="Any"
        className="p-column-filter"
        maxSelectedLabels={1}
      />
    )
  }
  const statuses = [
    'unqualified',
    'qualified',
    'C951',
    'negotiation',
    'renewal',
    'proposal'
  ]
  const statusRowFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterApplyCallback(e.value)}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    )
  }
  const headerTemplate = (data) => {
    return (
      <React.Fragment>
        <span className="image-text">{data.barco}</span>
      </React.Fragment>
    )
  }
  const footerTemplate = (data) => {
    return (
      <React.Fragment>
        <td colSpan="4" style={{ textAlign: 'right' }}>
          Total Customers
        </td>
        <td>{calculateCustomerTotal(data.barco)}</td>
      </React.Fragment>
    )
  }
  const calculateCustomerTotal = (barco) => {
    let total = 0

    if (reporteCargas) {
      for (let sumabarco of reporteCargas) {
        if (sumabarco.barco === barco) {
          total += sumabarco.tren_cargados
          // total++;
        }
      }
    }

    return total
  }
  const valorres = { ...reporteCargas.barco }
  return (
    <>
      <Toolbar
        className="mb-4"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>

      <DataTable
        ref={dt}
        value={reporteCargas}
        onSelectionChange={(e) => setSelectedProducts(e.value_id)}
        dataKey="id"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        selectionMode="single"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Muestra {first} a {last} de {totalRecords} ReporteCargas"
        globalFilter={globalFilter}
        emptyMessage="No hay reporteCargas."
        header={header}
        sortField="reporteCargaCreado"
        sortOrder={-1}
        footerColumnGroup={footerGroup}
        filters={filters2}
        rowGroupMode="subheader"
        groupRowsBy="barco"
        sortMode="single"
        rowGroupHeaderTemplate={headerTemplate}
        rowGroupFooterTemplate={footerTemplate}
        loading={loading}
      >
        <Column
          field="barco"
          header="barco"
          filterField="barco"
          filterMenuStyle={{ width: '14rem' }}
          style={{ minWidth: '14rem' }}
          filter
          filterElement={representativeRowFilterTemplate}
          hidden={true}
        />
        <Column
          field="gabarra"
          header="gabarra"
          showFilterMatchModes={false}
          filterMenuStyle={{ width: '14rem' }}
          style={{ minWidth: '14rem' }}
          filter
          filterElement={statusRowFilterTemplate}
        />
        <Column field="barcoID" header="barcoID" />
        <Column field="gabarraID" header="gabarraID" />
        <Column field="trenCargados" header="trenCargados" />
        <Column field="trenTotales" header="trenTotales" />
        <Column field="toneladasCargadas" header="toneladasCargadas" />
        <Column field="toneladasTotales" header="toneladasTotales" />
        <Column
          field="reporteCargaCreado"
          body={fechaBodyTemplate1}
          header="reporteCargaCreado"
          dataType="date"
        />
        <Column
          field="reporteCargaModificado"
          body={fechaBodyTemplate2}
          header="reporteCargaModificado"
          dataType="date"
        />
        <Column body={actionBodyTemplate}></Column>
      </DataTable>
      <ReporteCargaForm isVisible={isVisible} setIsVisible={setIsVisible} />

      <Dialog
        visible={deleteReporteCargaDialog}
        style={{ width: '450px' }}
        header="Confirm"
        modal
        footer={deleteReporteCargaDialogFooter}
        onHide={() => clearSelected()}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: '2rem' }}
          />
          {reporteCarga && (
            <span>
              Esta seguro que quiere eliminar la reporteCarga{' '}
              <b>{reporteCarga.barco}</b>?
            </span>
          )}
        </div>
      </Dialog>
      <h1>hola {thisYearTotal()}</h1>
    </>
  )
}

export default ReporteCargaList
