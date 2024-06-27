import { useContext, useEffect, useState } from 'react';
import style from './style.module.css';
import { FaCamera, FaCameraRotate, FaCheck, FaUpload } from 'react-icons/fa6';
import { IoRefresh } from 'react-icons/io5';
import UserAuthContext from '../../../contexts/authContext';
import { serverUrl, title } from '../../../constants';
import { Button, Input, Popconfirm, Select, Space, Table, message } from 'antd';
import { getDateForInput, getFormttedDate } from '../../../utils/helpers';
import { BsFillCameraFill } from 'react-icons/bs';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import { Form } from './deliveryForm';
import Loading from '../../../pages/loading';
import { usePatchData } from '../../../apiHandlers/patchApis';

export default function DeliveryStatusEntry() {
  const [docketDetails, setDocketDetails] = useState({});
  const [docketDetailsArr, setDocketDetailsArr] = useState([]);
  const [docket, setDocket] = useState('');
  const [isSubmitting, setIsSumitting] = useState(false);
  const [statusReport, setStatusReport] = useState({});
  const { setUser, user } = useContext(UserAuthContext);
  const [uploadProps, setUploadProps] = useState({});
  const [isCamera, setIsCamera] = useState(false);

  useEffect(() => {
    setUploadProps((p) => (isCamera ? { capture: 'environment' } : {}));
  }, [isCamera]);

  const fetchDocketData = async (e) => {
    try {
      if (e.keyCode == '13') {
        const res = await fetch(
          serverUrl + 'booking?drsentry=1&docket=' + docket,
          { credentials: 'include' },
        );
        const json = await res.json();
        if (res.ok) {
          const detailsArr = Object.entries(json.data);
          setDocketDetailsArr([...detailsArr]);
          setDocketDetails({ ...json.data });
          message.success('Docket details fetched.');
          if (json.data.packetStatus == 'booked') {
            return;
          }
          setStatusReport((p) => {
            const obj = { ...p };
            obj.status = json.data.status;
            obj.rcType = json.data.rcType;
            obj.rcName = json.data.rcName;
            obj.statusRemarks = json.data.statusRemarks;
            obj.rcDate = getDateForInput(json.data.rcDate);
            obj.podRemarks = json.data.podRemarks;
            obj.podReceivingDate = json.data.podReceivingDate;
            return obj;
          });
        } else if (res.status == 500) {
          message.error('Internal server error occured');
        } else if (res.status == 401) {
          message.error('Session Expired.');
          setUser(null);
          sessionStorage.clear();
        } else {
          message.error(json.msg);
        }
      }
    } catch (err) {
      message.error('Error occured while fetching docket details', err);
    }
  };

  const handleInput = (e) => {
    setStatusReport((p) => {
      const obj = { ...p };
      if (e.target.type == 'file') {
        if (e.target.files[0].type != 'image/jpeg') {
          message.error('Invalid file type. Please select a JPEG file');
          return obj;
        }
        obj[e.target.name] = e.target.files[0];
      } else {
        obj[e.target.name] = e.target.value;
      }
      return obj;
    });
  };

  const resetForm = () => {
    setDocket((p) => '');
    setStatusReport((p) => {
      return {};
    });
    setDocketDetails((p) => {
      return {};
    });
    setDocketDetailsArr((p) => []);
  };

  const updateDeliveryStatus = async (status) => {
    try {
      setIsSumitting(true);
      const formData = new FormData();
      for (var key in status) {
        formData.append(key, status[key]);
      }
      const res = await fetch(serverUrl + 'deliveries?docket=' + docket, {
        credentials: 'include',
        method: 'PATCH',
        body: formData,
      });
      const json = await res.json();
      if (res.status == 200) {
        resetForm();
        message.success('Status updated');
      } else if (res.status == 500) {
        message.error(json.err);
      } else {
        message.error(json.msg);
      }
    } catch (error) {
      message.error('Error occured: ' + error);
    } finally {
      setIsSumitting(false);
    }
  };

  return (
    <>
      {isSubmitting ? <Loading /> : null}
      <div className={style.formContainer}>
        <p>Delivery Status Entry</p>
        <div>
          <div className={style.left}>
            <div className={style.rows}>
              <label htmlFor="">Docket No</label>
              <input
                type="search"
                placeholder="Docket No"
                value={docket}
                onInput={(e) => setDocket(e.target.value)}
                onKeyDown={fetchDocketData}
              />
            </div>

            <div className={style.rows}>
              <label htmlFor="">Runsheet No</label>
              <input
                type="text"
                value={docketDetails.runsheetNumber || ''}
                placeholder="Runsheet No"
                disabled
              />
            </div>

            {user.role == 'dlb' ? (
              <Form
                visible={docketDetailsArr.length > 0}
                docketDetails={docketDetails}
                onSubmit={updateDeliveryStatus}
              />
            ) : (
              <>
                <div className={style.rows}>
                  <label htmlFor="">Packet Status</label>
                  <select
                    name="status"
                    onChange={handleInput}
                    value={statusReport.status || ''}
                  >
                    <option value="">--Select--</option>
                    <option value="delivered">Delivered</option>
                    <option value="in-transit">In Transit</option>
                    <option value="misroute">MisRoute</option>
                    <option value="out for delivery">Out For Delivery</option>
                    <option value="return to origin">Return To Origin</option>
                    <option value="undelivered">UnDelivered</option>
                  </select>
                </div>

                <div className={style.rows}>
                  <label htmlFor="">Status Remarks</label>
                  <input
                    type="text"
                    name="statusRemarks"
                    placeholder="Status Remark"
                    value={statusReport.statusRemarks || ''}
                    onInput={handleInput}
                  />
                </div>

                {statusReport.status == 'delivered' ? (
                  <>
                    <div className={style.rows}>
                      <label htmlFor="">Receiving Type</label>
                      <select
                        name="rcType"
                        value={statusReport.rcType}
                        onChange={handleInput}
                      >
                        <option value="">--Select--</option>
                        <option value="signAndStamp">Sign and Stamp</option>
                        <option value="sign">Sign</option>
                        <option value="stamp">Stamp</option>
                      </select>
                    </div>
                    <div className={style.rows}>
                      <label htmlFor="">Receiving Date</label>
                      <input
                        type="date"
                        name="rcDate"
                        value={getDateForInput(statusReport.rcDate)}
                        onInput={handleInput}
                      />
                    </div>
                    <div className={style.rows}>
                      <label htmlFor="">Receiver Name</label>
                      <input
                        type="text"
                        name="rcName"
                        placeholder="Receiver Name"
                        value={statusReport.rcName}
                        onInput={handleInput}
                      />
                    </div>
                    <div className={style.rows}>
                      <label htmlFor="">Pod from Camera</label>
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'grid',
                          justifyContent: 'flex-start',
                          paddingBlock: '5px',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isCamera}
                          onClick={(e) => setIsCamera((p) => !p)}
                        />
                      </div>
                    </div>
                    <div className={style.rows}>
                      <label htmlFor="">POD</label>
                      <label htmlFor="pod" className={style.uploader}>
                        {!isCamera ? (
                          <div>
                            <FaUpload style={{ color: 'purple' }} />
                            <span>
                              {statusReport?.pod?.name || 'Select image...'}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <FaCamera style={{ color: 'purple' }} />
                            <span>
                              {statusReport?.pod?.name || ' Click image...'}
                            </span>
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        id="pod"
                        name="pod"
                        {...uploadProps}
                        hidden
                        onInput={handleInput}
                      />
                    </div>
                    <div className={style.rows}>
                      <label htmlFor="">POD Receiving Date</label>
                      <input
                        type="date"
                        name="podReceivingDate"
                        value={getDateForInput(statusReport.podReceivingDate)}
                        onInput={handleInput}
                      />
                    </div>
                    <div className={style.rows}>
                      <label htmlFor="">POD Remarks</label>
                      <select
                        name="podRemarks"
                        value={statusReport.podRemarks}
                        onChange={handleInput}
                      >
                        <option value="">--Select--</option>
                        <option value="hard copy">Hard Copy</option>
                        <option value="soft copy">Soft Copy</option>
                      </select>
                    </div>
                  </>
                ) : null}

                {/* <label htmlFor="">POD Remarks</label>
                                <span>
                                    
                                    <p>
                                        <input type="checkbox" name="" id="" onChange={handlePodRemarks} /> Fix
                                    </p>
                                </span>

                                <label htmlFor="">POD Receiving Date</label>
                                <input type="date" name="" id="" />

                                <label htmlFor="">Remarks</label>
                                <textarea name="" id="" cols="30" rows="3" placeholder='Remarks'></textarea> */}
              </>
            )}
          </div>
          <div className={style.right}>
            <table
              style={{
                borderCollapse: 'collapse',
                width: '100%',
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: 'rgb(227, 227, 225)',
                  }}
                >
                  <th
                    style={{
                      borderBottom: '1px solid black',
                      borderRight: '1px solid black',
                      paddingInline: '10px',
                    }}
                  >
                    Fields
                  </th>
                  <th
                    style={{
                      borderBottom: '1px solid black',
                      paddingInline: '10px',
                    }}
                  >
                    Values
                  </th>
                </tr>
              </thead>
              <tbody>
                {docketDetailsArr.length > 0 ? (
                  docketDetailsArr.map((entry, i) => {
                    const trStyle = {
                      fontSize: '13px',
                      fontWeight: '500',
                      backgroundColor: 'rgb(244, 240, 240)',
                    };
                    i % 2 == 0
                      ? (trStyle.backgroundColor = 'rgb(251, 251, 251)')
                      : null;
                    return (
                      <tr style={trStyle}>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            borderRight: '1px solid black',
                            paddingInline: '10px',
                            textTransform: 'capitalize',
                          }}
                        >
                          {entry[0].split(/(?=[A-Z])/).join(' ')}
                        </td>
                        <td
                          style={{
                            borderBottom: '1px solid black',
                            paddingInline: '10px',
                          }}
                        >
                          {entry[0].includes('Date') && entry[1] ? (
                            getFormttedDate(entry[1])
                          ) : entry[0].includes('Image') && entry[1] ? (
                            <a
                              href={entry[1] || ''}
                              target="_blank"
                              style={{
                                textDecoration: 'underline',
                                color: 'blue',
                              }}
                            >
                              Download Image
                            </a>
                          ) : (
                            entry[1]
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No Data Available to Show...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {user.role != 'dlb' ? (
        <div className={style.actions}>
          <button
            className={style.buttonChk}
            onClick={(e) => updateDeliveryStatus(statusReport)}
          >
            <FaCheck /> save
          </button>
          <button className={style.buttonRef} onClick={resetForm}>
            <IoRefresh /> Reset
          </button>
        </div>
      ) : null}
    </>
  );
}
