import { Button, Input, Popconfirm, Select, Space, message } from 'antd';
import { useEffect, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaFileAlt,
} from 'react-icons/fa';
import style from './style.module.css';

export const Form = (props) => {
  const [deliverStatus, setDeliveryStatus] = useState({
    status: props.docketDetails?.packetStatus || '-1',
    rcType: '',
    rcName: '',
    podRemarks: '',
    pod: null,
  });

  const [isCamera, setIsCamera] = useState(false);
  const [cameraProps, setCameraProps] = useState({})

  useEffect(()=>{
        setCameraProps(p=>{
            return isCamera?{capture:'environment'}:{}
        })
  },[isCamera])

  const handleForm = (e) => {
    setDeliveryStatus((p) => {
      const obj = { ...p };
      if (e.target.type == 'file') {
        obj[e.target.name] = e.target.files[0];
      } else {
        obj[e.target.name] = e.target.value;
      }
      return obj;
    });
  };

  const handleSelect = (f, val) => {
    setDeliveryStatus((p) => {
      const obj = { ...p };
      obj[f] = val;
      return obj;
    });
  };

  const validate = () => {
    if (deliverStatus.status == '-1') {
      message.warning('Please select delivery status.');
      return false;
    }
    if (deliverStatus.rcType == '-1') {
      message.warning('Please select Receiving Type.');
      return false;
    }
    if (deliverStatus.rcName.trim().length < 3) {
      message.warning('Please Enter Receiver Name.');
      return false;
    }
    if (deliverStatus.podRemarks.trim().length < 3) {
      message.warning('Please Enter POD Remarks');
      return false;
    }
    if (deliverStatus.pod == null) {
      message.warning('Please upload POD');
      return false;
    }

    return true;
  };

  const submit = () => {
    if (!validate()) {
      return;
    }

    props.onSubmit(deliverStatus);
  };
  return (
    <>
      {props.visible ? (
        <>
          <div className={style.rows}>
            <label htmlFor="">Status</label>
            <Select
              name="status"
              defaultValue={deliverStatus.status}
              onChange={(val) => handleSelect('status', val)}
              options={[
                { value: '-1', label: '---Select status---' },
                { value: 'delivered', label: 'delivered' },
                { value: 'undelivered', label: 'unDelivered' },
                { value: 'out for delivery', label: 'Out for delivery' },
              ]}
            ></Select>
          </div>
          <div className={style.rows}>
            <label htmlFor="">Receiving Type</label>
            <Select
              name="rcType"
              defaultValue={'-1'}
              onChange={(v) => handleSelect('rcType', v)}
              options={[
                { value: '-1', label: 'Select Receiving Type' },
                { value: 'sign', label: 'Sign' },
                { value: 'stamp', label: 'Stamp' },
                { value: 'signAndStamp', label: 'Sign and Stamp' },
              ]}
            ></Select>
          </div>

          <div className={style.rows}>
            <label htmlFor="">Receiver Name</label>
            <Input
              placeholder="Receiver Name"
              value={deliverStatus.rcName}
              name="rcName"
              onInput={handleForm}
              className={style.col2}
            />
          </div>

          <div className={style.rows}>
            <label htmlFor="">POD Remarks</label>

            <Select
              style={{ width: '300' }}
              defaultValue={'-1'}
              onChange={(v) => handleSelect('podRemarks', v)}
              options={[
                { value: '-1', label: 'Select POD Remarks' },
                { value: 'hard copy', label: 'Hard Copy' },
                { value: 'soft copy', label: 'Soft Copy' },
              ]}
            />
          </div>
          <div className={style.rows}>
            <label htmlFor="">Pod Image/File</label>
            <span>
              <label
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <input
                  type="checkbox"
                  style={{ width: 'fit-content', margin: '0', padding: '0' }}
                  checked={isCamera}
                  onClick={e=>setIsCamera(p=>!p)}
                />
                <span>Camera</span>
              </label>
              <label
                htmlFor="pod"
                style={{
                  width: '100%',
                  color: 'purple',
                  padding: '3px',
                  boxShadow: '2px 2px 3px grey',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '10px',
                  backgroundColor: 'whitesmoke',
                }}
              >
                {isCamera ? (
                  <BsFillCameraFill style={{ fontSize: '23px' }} />
                ) : (
                  <FaFileAlt style={{ fontSize: '23px' }} />
                )}
              </label>
            </span>
          </div>
          <input
            id="pod"
            type="file"
            {...cameraProps}
            name="pod"
            onChange={handleForm}
            hidden
          />
          <span>{deliverStatus.pod?.name}</span>
          <Popconfirm onConfirm={submit} title="Sure to submit ?">
            <Button style={{ width: '100%' }} type="primary">
              Submit
            </Button>
          </Popconfirm>
        </>
      ) : null}
    </>
  );
};

