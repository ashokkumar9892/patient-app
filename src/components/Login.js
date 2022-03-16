import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Badge } from "react-bootstrap";
import { CoreContext } from "../context/core-context";
import Input from "./common/Input";
import Logo from "../assets/images/logo.png";

import { LockFill } from "react-bootstrap-icons";

const Login = (props) => {
  const coreContext = useContext(CoreContext);
  const userType = localStorage.getItem("userType");
  const login = () => {
    // if(userType ==="patient"){
    //     const userId = localStorage.getItem("userId");
    //     const patientId =userId.split("_").pop();
    //     localStorage.setItem("userId",patientId)
    //     const url = 'patient-profile/' + patientId;
    //     coreContext.login(email, password, url);
    // }else{
    // coreContext.login(email, password);
    coreContext.login(email, password, "/dashboard");
    // }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChangedHandler = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChangedHandler = (e) => {
    setPassword(e.target.value);
  };
  const { register, handleSubmit, errors } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     marginTop: "150px",
    //     alignItems: "center",
    //   }}>
    //   <div className="card" style={{ width: "450px", borderRadius: "32px" }}>
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "center",
    //         marginTop: "15px",
    //       }}>
    //       <a href="#">
    //         {" "}
    //         <img src={Logo} style={{ height: 50 }} alt="" />
    //       </a>
    //     </div>
    //     <div className="card-body">
    //       <Form autoComplete="off" onSubmit={handleSubmit(login)} noValidate>
    //         <Input
    //           label="Email"
    //           elementType="text"
    //           minLength={5}
    //           maxLength={55}
    //           placeholder="Enter Email"
    //           onChange={onEmailChangedHandler}
    //           name="email"
    //           required={true}
    //           register={register}
    //           errors={errors}
    //         />
    //         <Input
    //           label="Password"
    //           elementType="password"
    //           placeholder="Enter Password"
    //           onChange={onPasswordChangedHandler}
    //           required={true}
    //           minLength={5}
    //           maxLength={55}
    //           register={register}
    //           errors={errors}
    //           name="password"
    //         />
    //         <Input
    //           blockButton={true}
    //           value="Log In"
    //           elementType="button"
    //           variant="primary"
    //         />
    //         <br />
    //         <center> {coreContext.renderLoader()}</center>
    //         <center>
    //           {" "}
    //           <Input
    //             variant="danger"
    //             label={coreContext.message}
    //             elementType="label"
    //           />
    //         </center>
    //         <center>
    //           <a href="reset-password">
    //             <LockFill /> Forgot your password?
    //           </a>
    //         </center>
    //         <br />
    //         <center>
    //           <span>
    //             {" "}
    //             Don't have an account ? Please Contact A Pattern Medical Clinic
    //             (423) 455-2711{" "}
    //           </span>{" "}
    //         </center>
    //       </Form>
    //     </div>
    //   </div>
    // </div>
    <div className="h-100">
<div className="fixed-background"></div>
<div className="container-fluid p-0 h-100 position-relative">
<div className="row g-0 h-100">
<div className="offset-0 col-12 d-none d-lg-flex offset-md-1 col-lg h-lg-100">
<div className="min-h-100 d-flex align-items-center">
<div className="w-100 w-lg-75 w-xxl-50">
<div>
<div className="mb-5">
<h1 className="display-1 text-white">Healthcare</h1>
<h1 className="display-1 text-white">You Can Afford
</h1>
</div>
<p className="h6 text-white lh-1-5 mb-5">
Here at A Pattern Medical Clinic, our top priority is patient care. In order to make sure that we can see you, we choose rates that are well below the Emergency Room prices.
</p>
<div className="mb-5">
<a className="btn btn-lg btn-outline-white" href="">Learn More</a>
</div>
</div>
</div>
</div>
</div>
<div className="col-12 col-lg-auto h-100 pb-4 px-4 pt-0 p-lg-0">
<div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center shadow-deep py-5 full-page-content-right-border">
<div className="sw-lg-70 px-5" >
	<div className="row mb-5" >
	<div className="col-xl-12 text-center mt-7" >
		<div className="sh-11">
	
<a href="">
<div className="logo-default mx-auto"></div>
</a>
</div>
		</div>
	</div>
	<div className="row">
	<div className="col-xl-12">
<form className="tooltip-end-bottom" onSubmit={handleSubmit(login)} noValidate>
	<div className="row">
	<div className="col-xl-12">
		<div className="mb-3 filled form-group tooltip-end-top">
			<i className="icon-14 bi-person-fill text-primary"></i>
     
<input className="form-control" name="email" placeholder="Enter Email"  minLength={5}
          maxLength={55} onChange={onEmailChangedHandler} errors={errors}/>
</div>
	</div>
	</div>
	<div className="row">
	<div className="col-xl-12">
		<div className="mb-3 filled form-group tooltip-end-top">
<i className="icon-14 bi-unlock text-primary">
  
</i>
<input className="form-control pe-7" label="Password"
              type="password"
              register={register}
              placeholder="Enter Password"
              onChange={onPasswordChangedHandler}
              required={true}
              minLength={5}
              maxLength={55}
            
              errors={errors}
              name="password"/>
<a className="text-small position-absolute t-3 e-3" href="reset-password">Forgot?</a>
</div>
	</div>
	</div>
	<div className="row">
	<div className="col-xl-12 mx-auto text-center">
		<button type="submit" className="btn btn-lg btn-info">Login</button>
    <Input
                variant="danger"
                label={coreContext.message}
                elementType="label"
              />
	</div>
  <center> {coreContext.renderLoader()}</center>
	</div>
	</form>
	
<div className="row mt-5">
	<div className="col-xl-12  text-center">
		Don't have an account ? Please Contact  <br/>
		<strong>A Pattern Medical Clinic (423) 455-2711</strong> </div>
</div>

</div>
</div>
</div>
</div>
</div>
</div>
	</div>
</div>
  );
};

export { Login };
