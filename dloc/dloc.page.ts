import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { ShrngService } from '../srv/shrng.service';

@Component({
  selector: 'dloc',
  templateUrl: './dloc.page.html',
  styleUrls: ['./dloc.page.scss'],
})
export class DlocPage implements OnInit {
  passed:any;
  data=[];
  lngth:number;
  img:string;
  addrs:any;
  tlp:any;
  ktgr:any;

  constructor(
    private shr:ShrngService,
    private afs:AngularFirestore,
    public navCtrl: NavController,
  ) {}

  async ngOnInit() {
    this.passed=this.shr.getMsg()
    this.afs.collection('locations', ref => ref.where('Nama', '==', this.passed)).valueChanges().subscribe(res=>{
      this.data=res;
      console.log(this.data)
      })
      // this.img="../../assets/img/"+this.loadedData[3]+".png"
      // console.log(this.loadedData[3])
    // })
    // this.qData()
    // this.loadedData=this.shr.getArray()
   
    // console.log(this.img)
    // this.addrs=this.loadedData[0]
    console.log(this.data)
  }

  public toStr(a:any){
    let c:string;
    c=a.Object.toString()
    console.log(c)
    return(c)
  }
  public totxt(a:any){
    let c:string;
    c="../../assets/img/"+a+".png"
    console.log(c)
    return(c)
  }

  // public qData(){
  //   this.passed=this.shr.getMsg()
   
  //   this.afs.collection('locations', ref => ref.where('Nama', '==', this.passed)).snapshotChanges().subscribe(res=>{
  //     this.loadedData=[];
  //     res.forEach(a=>{
  //       let item:any=a.payload.doc.data()
  //       this.loadedData.push(item);
  //       console.log(this.loadedData)
  //     })
      // var isi=[];
      // res.docs.forEach((doc)=>{
      //   isi.push(doc.data())
      //   this.loadedData=isi;
      //   this.lngth=this.loadedData.length
      // })      
      // this.addrs=res.
      // this.tlp=this.loadedData[5]
      // this.ktgr=this.loadedData[4]
      // this.img="../../assets/img/"+this.loadedData[3]+".png"
    // })
    // for(let i=0;i<this.lngth;i++)
    // {
    //   console.log(this.loadedData[i])
    // }
  // }
  
  public bAja(a){
    // this.qData()

    // ,".png""../../assets/img/",
    this.shr.setBln(a)
    this.navCtrl.navigateRoot('home')
  }
}
