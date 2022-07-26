<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    
    public function show_api()
    {
        $items = Item::all();
        return $items;
    }

    public function add_item(Request $request)
    {
        
        $item = new Item();
        $item->name = $request->name;
        
        $item->description = $request->description;

        if($request->has('image')) {
                $image= $request->file('image');
                $filename =time().'.'.$image->getClientOriginalExtension();
                $image->move('uploads/', $filename);
                $item->image = $filename;
        }
        $item->save();
        return $item;
    
    }

    public function update_item($id , Request $request)
    {
        $item = Item::find($id);
        $item->name = $request->name;

        if($request->has('image')) {
            $image= $request->file('image');
            $filename =time().'.'.$image->getClientOriginalExtension();;
            $image->move('uploads/', $filename);
            $item->image = $filename;
            }

        $item->description = $request->description;
        $item->save();
        return $item;
    }
    public function delete_item($id)
    {
        $item = Item::find($id);
        $delete = $item;
        $item->delete();
        return $delete;
        
    }
}
