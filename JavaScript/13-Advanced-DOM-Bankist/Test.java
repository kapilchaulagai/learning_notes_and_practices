package com.isteer.appsteer.io.activity.controls;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Parcelable;
import android.text.method.ScrollingMovementMethod;
import android.util.DisplayMetrics;
import android.util.Log;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridLayout;
import android.widget.HorizontalScrollView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.view.ContextThemeWrapper;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.isteer.appsteer.io.R;
import com.isteer.appsteer.io.activity.MainActivity;
import com.isteer.appsteer.io.model.FieldAttribute;
import com.isteer.appsteer.io.model.FormField;
import com.isteer.appsteer.io.model.FormParser;
import com.isteer.appsteer.io.model.FormView;
import com.isteer.appsteer.io.model.FormViewHeader;
import com.isteer.appsteer.io.utils.AppSteerUtils;
import com.isteer.appsteer.io.utils.Constants;
import com.isteer.appsteer.io.utils.ControlUtils;
import com.isteer.appsteer.io.utils.NonScrollRecyclerView;
import com.isteer.appsteer.io.utils.RepeaterFormFields;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


public class RepeaterControl {
    private int colSpan;
    private int colNo, repeaterNumberOfColumn, numberOfRows, rowLimitation;
    private int rowSpan, rowNo = 1;
    List<List<FormField>> formFieldsArrayList = new ArrayList<List<FormField>>();
    LinearLayout.LayoutParams fieldParams;
    Context context;
    TextView txtViewLabel;
    LinearLayout fieldsLinearLayout;
    int colCount;
    String username;
    FormField repeaterFormField;
    GridLayout formGridLayout;
    FormParser formParser;
    public RepeaterViewAdapter repeaterViewAdapter;
    LinearLayout rootLayoutListview;
    LinearLayout labelRepeaterButtonLayout;
    NonScrollRecyclerView recyclerView;
    String linkedAppUUID;
    FormField formField;
    TextView textviewCount, nextImageview, prevImageview;
    HorizontalScrollView horizontalScrollView;
    TableLayout tableLayout;
    String isHidden;
    boolean readOnly;
    RelativeLayout rootLayout;
    LinearLayout unsupportedFieldAlertLayout;
    int layoutWidth;

    TextView tabTextView;
    ImageView dotImage;
    int headerPosition;
    String themeColor2;
    public boolean isFromFormPager = false;

    private final BroadcastReceiver changeOrientationReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (action.equals("ORIENTATION_CHANGED")) {
                isRecyclerviewCalled = true;
                repeaterViewAdapter.notifyDataSetChanged();
            }
        }
    };

    @SuppressLint("MissingInflatedId")
    public RepeaterControl(GridLayout formGridLayout, final Context context, final FormField formField, LinearLayout fieldsLinearLayoutHeaderLayout, LinearLayout.LayoutParams fieldParams, int colCount, final FormParser formParser, TextView tabTextView,
                           int headerPosition) {
        formField.setControl(this);

        this.tabTextView = tabTextView;
        this.headerPosition = headerPosition;
        this.formField = formField;
        formField.setFieldType("Repeater");
        this.formParser = formParser;
        this.formGridLayout = formGridLayout;
        this.repeaterFormField = formField;
        this.colCount = colCount;

        this.context = context;
        this.fieldParams = fieldParams;
        MainActivity.REPEATER_FIELD = formField;

        View textViewLableLayout = LayoutInflater.from(context).inflate(R.layout.app_textview_label_layout, null);
        rootLayout = textViewLableLayout.findViewById(R.id.roo_layout);
        txtViewLabel = textViewLableLayout.findViewById(R.id.textview_lable);
        unsupportedFieldAlertLayout = textViewLableLayout.findViewById(R.id.unsupported_fields_alert_layout);


        LocalBroadcastManager.getInstance(context).unregisterReceiver(changeOrientationReceiver);
        LocalBroadcastManager.getInstance(context).registerReceiver(changeOrientationReceiver,
                new IntentFilter("ORIENTATION_CHANGED"));

        SharedPreferences userDetails = AppSteerUtils.getLocalStore(Constants.KYC_SHARED_PREFERENCE, context);
        themeColor2 = userDetails.getString(Constants.ORGANIZATION_THEME_COLOR2, Constants.ORGANIZATION_THEME_COLOR2_VALUE);
        nextImageview = textViewLableLayout.findViewById(R.id.textview_next);
        prevImageview = textViewLableLayout.findViewById(R.id.textview_prev);

        textviewCount = textViewLableLayout.findViewById(R.id.textview_status);
        Typeface font = Typeface.createFromAsset(context.getAssets(), "fonts/icomoon.ttf");
        nextImageview.setTypeface(font);
        prevImageview.setTypeface(font);
        dotImage = textViewLableLayout.findViewById(R.id.dot_imageview);
        dotImage.setVisibility(View.GONE);

        RelativeLayout.LayoutParams textViewLableParams = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
        textViewLableParams.addRule(RelativeLayout.ALIGN_PARENT_START);
        textViewLableParams.setMargins((int) ControlUtils.convertDpToPixel(16), (int) ControlUtils.convertDpToPixel(10), 0, (int) ControlUtils.convertDpToPixel(8));
        txtViewLabel.setLayoutParams(textViewLableParams);
        txtViewLabel.setTextColor(Color.BLACK);
        txtViewLabel.setAllCaps(true);

        username = userDetails.getString(Constants.KYC_USER_ID, "");

        View view = LayoutInflater.from(context).inflate(R.layout.repeater_control, null, false);
        rootLayoutListview = view.findViewById(R.id.rootlayoutListview);

        rootLayout.setBackground(context.getDrawable(R.drawable.repeater_bg));
        rootLayout.setLayoutParams(this.fieldParams);

        if (formField.getFieldAttributes() != null) {
            List<FieldAttribute> fieldAttribute = formField.getFieldAttributes().getFieldAttribute();
            drawControl(fieldAttribute);
        }

        this.fieldsLinearLayout = fieldsLinearLayoutHeaderLayout;
        txtViewLabel.setSingleLine(!showLabelMultiline);
        if (formField.isError()) {
            txtViewLabel.setCompoundDrawablesWithIntrinsicBounds(0, 0, R.drawable.ic_error_red_18dp, 0);
        }

        if (formField.isIsMandatory()) {
            dotImage.setColorFilter(Color.parseColor(themeColor2));
            txtViewLabel.setText(formField.getUILabel() /*+ context.getString(R.string.mandatory_star)*/);
        } else {
            dotImage.setColorFilter(context.getResources().getColor(R.color.edittext_border));
            txtViewLabel.setText(formField.getUILabel());
        }

        boolean isEditRestrictedInHeader = false;
        breakloop:
        for (int i = 0; i < formParser.getForms().getForm().size(); i++) {
            List<FormView> formViews = formParser.getForms().getForm().get(i).getFormViews().getFormView();
            for (int j = 0; j < formViews.size(); j++) {
                List<FormViewHeader> formHeaders = formViews.get(j).getFormViewHeaders().getFormViewHeader();
                for (int k = 0; k < formHeaders.size(); k++) {
                    if (formHeaders.get(k).getFormViewHeaderID() == formField.getHeaderID()) {
                        isEditRestrictedInHeader = formHeaders.get(k).isRestrictEditForHeader();
                        break breakloop;
                    }
                }
            }
        }

        boolean isEditRestrictedInView = formParser.getForms().getForm().get(0).getFormViews().getFormView().get(formParser.getCurrentView()).isRestrictEditView();
        if (isEditRestrictedInView || isEditRestrictedInHeader) {
            formField.setRestricted(true);
            setReadOnly(true);
        }

        if (isFieldLevelRestricted) {
            if (restrictView)
                isHidden = "true";
            else if (restrictEdit)
                setReadOnly(true);
            formField.setRestricted(true);
        }

        if (formField.notEditable) {
            setReadOnly(true);
        }

        //Draw the initial UI for the group/subapp field
        drawInitialUI();

        // 1= Table
        //2 = single card
        //3 = continoues cards
        textviewCount.setVisibility(View.GONE);
        if (displayAs == 2 && allowRepeat) {
            //Single Card View
            nextImageview.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (formField.getVisibleItemPosition() < formFieldsArrayList.size() - 1) {
                        isRecyclerviewCalled = true;
                        formField.setVisibleItemPosition(formField.getVisibleItemPosition() + 1);
                        repeaterViewAdapter.notifyDataSetChanged();
                    }
                }
            });

            prevImageview.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (formField.getVisibleItemPosition() > 0) {
                        isRecyclerviewCalled = true;
                        formField.setVisibleItemPosition(formField.getVisibleItemPosition() - 1);
                        repeaterViewAdapter.notifyDataSetChanged();
                    }
                }
            });

        } else if (displayAs == 1) {
            //Table View
            horizontalScrollView = new HorizontalScrollView(context);
            tableLayout = new TableLayout(context);
            horizontalScrollView.addView(tableLayout);
            textviewCount.setVisibility(View.GONE);

            addHeaderInTable();
        }

        if (allowRepeat) {
            if (rowLimitation != 3) {
                textviewCount.setText(formFieldsArrayList.size() + " - " + numberOfRows);
            } else if (formFieldsArrayList.size() == 0) {
                textviewCount.setText(formFieldsArrayList.size() + " - " + formFieldsArrayList.size());
            } else {
                textviewCount.setText(String.valueOf(formFieldsArrayList.size()));
            }
        } else {
            textviewCount.setVisibility(View.GONE);
        }
        labelRepeaterButtonLayout = new LinearLayout(context);
        labelRepeaterButtonLayout.setOrientation(LinearLayout.HORIZONTAL);
        labelRepeaterButtonLayout.addView(textViewLableLayout);

        recyclerView = view.findViewById(R.id.repeater_recycler_view);
        recyclerView.setBackground(context.getDrawable(R.drawable.repeater_bg));
        repeaterViewAdapter = new RepeaterViewAdapter(context);
        RecyclerView.LayoutManager mLayoutManager;
        if (scrollOrientation == 1 || displayAs == 1) {
            mLayoutManager = new LinearLayoutManager(context, RecyclerView.VERTICAL, false);
        } else {
            mLayoutManager = new LinearLayoutManager(context, RecyclerView.HORIZONTAL, false);
        }

        if (textViewLableLayout.getParent() != null)
            ((ViewGroup) textViewLableLayout.getParent()).removeView(textViewLableLayout);

        rootLayoutListview.addView(textViewLableLayout);

        if (recyclerView.getParent() != null)
            ((ViewGroup) recyclerView.getParent()).removeView(recyclerView);

        isRecyclerviewCalled = true;
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.setAdapter(repeaterViewAdapter);
        repeaterViewAdapter.notifyDataSetChanged();

        rootLayoutListview.addView(recyclerView);

        if (isHidden != null && isHidden.equals("true")) {
            formField.setViewRestricted(true);
        } else {
            FormViewHeader formViewHeader = formParser.getViewsList().get(formParser.getCurrentView()).getFormViewHeaders().getFormViewHeader().get(headerPosition);
            boolean isLayoutFixed = ControlUtils.isLayoutFixed(formViewHeader);
            if (!isLayoutFixed) {
                formViewHeader.setCurrentColSpan(this.colSpan);
                this.colNo = ControlUtils.calculateColNo(formViewHeader, colCount);
                formViewHeader.setPrevColSpan(this.colSpan);
            }
            ControlUtils.addFieldViewToFormLayout(isLayoutFixed, formGridLayout, rootLayoutListview, new GridLayout.LayoutParams()
                    , this.colNo - 1, this.colSpan, colCount, this.rowSpan, this.rowNo, null);

            rootLayoutListview.post(new Runnable() {
                public void run() {
                    layoutWidth = rootLayoutListview.getWidth();
                    Log.d("SIZE_CO", "rootLayoutListview : " + rootLayoutListview.getWidth());
                }
            });
        }

        ArrayList<Object> arrayList = new ArrayList<>();
        arrayList.add(recyclerView);
        arrayList.add(formFieldsArrayList);
        arrayList.add(txtViewLabel);
        arrayList.add(repeaterFormField);

        formParser.getHashMapFields().put(formField.getFieldID(), arrayList);
        formParser.getRepeaterHashMapFields().put(formField.getFieldID(), arrayList);

    }

    void drawInitialUI() {
        ArrayList<Object> arrayListData = (ArrayList<Object>) formParser.getHashMapFields().get(formField.getFieldID());
        if (arrayListData != null && !isFromFormPager) {
            formFieldsArrayList = (List<List<FormField>>) arrayListData.get(1);
        } else {
            ArrayList list = new ArrayList<HashMap<Integer, Object>>();
            if (rowLimitation == 1) {
                for (int i = 0; i < numberOfRows; i++) {
                    if (formField.getUIType() == 25 || formField.getUIType() == 30) {

                        //This block of if{} is required when attributes related to group field are changed on change attribute macro perform
                        if (numberOfRows == formFieldsArrayList.size())
                            return;

                        if (formField.getUIType() == 30)
                            repeaterFormField.setRepeaterFormFields(repeaterFormField.getGroupFields());
                        String json = new Gson().toJson(repeaterFormField.getRepeaterFormFields().getFormField());
                        if (!allowRepeat || rowLimitation == 1)
                            if (formFieldsArrayList.size() > i)
                                formFieldsArrayList.set(i, (List<FormField>) new Gson().fromJson(json, new TypeToken<List<FormField>>() {
                                }.getType()));
                            else
                                formFieldsArrayList.add((List<FormField>) new Gson().fromJson(json, new TypeToken<List<FormField>>() {
                                }.getType()));
                    } else {
                        SharedPreferences formIdsSharedPreferences = AppSteerUtils.getLocalStore(username + "formIds_WRT_formUUID_subapp", context);
                        Set<String> formIdsSet = formIdsSharedPreferences.getStringSet(linkedAppUUID, null);

                       /* //This block of if{} is required when linkedAppUUID is changed on change attribute macro perform
                        if (isFromFormPager && formIdsSet == null || formIdsSet.size() == 0) {
                            formIdsSharedPreferences = AppSteerUtils.getLocalStore(username + "formIds_WRT_formUUID", context);
                            formIdsSet = formIdsSharedPreferences.getStringSet(linkedAppUUID, null);
                        }*/
                        if (formIdsSet != null && formIdsSet.size() > 0) {
                            for (String formId : formIdsSet) {
                                SharedPreferences sharedPreferences = AppSteerUtils.getLocalStore(username + "form_subapp", context);
                                String result = sharedPreferences.getString(formId, "");

                                /*//This block of if{} is required when linkedAppUUID is changed on change attribute macro perform
                                if (isFromFormPager && result.equals("")) {
                                    sharedPreferences = AppSteerUtils.getLocalStore(username + "form", context);
                                    result = sharedPreferences.getString(formId, "");

                                    //Update same app as subapp in the shared pref
                                    SharedPreferences.Editor editor = AppSteerUtils.getLocalStoreEditor(username + "form_subapp", context);
                                    editor.putString(formId, result);
                                    editor.commit();

                                    SharedPreferences.Editor formIdsEditor = AppSteerUtils.getLocalStoreEditor(username + "formIds_WRT_formUUID_subapp", context);
                                    formIdsEditor.putStringSet(linkedAppUUID, formIdsSet);
                                    formIdsEditor.commit();
                                }*/

                                if (result != null && !result.equals("")) {
                                    try {
                                        JSONObject formObject = new JSONObject(result);
                                        JSONObject forms = formObject.getJSONObject("Forms");
                                        JSONObject form = (JSONObject) forms.getJSONArray("Form").get(0);
                                        JSONObject formViews = form.getJSONObject("FormViews");
                                        JSONObject formView = formViews.getJSONArray("FormView").getJSONObject(0);
                                        JSONObject FormViewHeaders = formView.getJSONObject("FormViewHeaders");
                                        JSONObject formViewHeader = FormViewHeaders.getJSONArray("FormViewHeader").getJSONObject(0);
                                        JSONObject formFields = formViewHeader.getJSONObject("FormFields");
                                        JSONArray fields = formFields.getJSONArray("FormField");

                                        RepeaterFormFields rep = new RepeaterFormFields();
                                        rep.setFormField(new Gson().fromJson(fields.toString(), new TypeToken<List<FormField>>() {
                                        }.getType()));
                                        repeaterFormField.setRepeaterFormFields(rep);
                                        if (list != null && list.size() != 0) {
                                            repeaterFormField.getRepeaterFormFields().setHashMapFields(list);
                                        }
                                        if (!allowRepeat || rowLimitation == 1)
                                            if (formFieldsArrayList.size() > i)
                                                formFieldsArrayList.set(i, (List<FormField>) new Gson().fromJson(fields.toString(), new TypeToken<List<FormField>>() {
                                                }.getType()));
                                            else
                                                formFieldsArrayList.add((List<FormField>) new Gson().fromJson(fields.toString(), new TypeToken<List<FormField>>() {
                                                }.getType()));

                                    } catch (Exception e) {
                                        e.printStackTrace();
                                    }

                                    break;
                                }
                            }
                        }
                    }
                    HashMap<Integer, Object> hashMapFields = new HashMap<>();
                    list.add(hashMapFields);
                    if (repeaterFormField.getRepeaterFormFields() != null) {
                        repeaterFormField.getRepeaterFormFields().setHashMapFields(list);
                    }
                }
            } else {
                if (formField.getUIType() == 25 || formField.getUIType() == 30) {
                    if (formField.getUIType() == 30)
                        repeaterFormField.setRepeaterFormFields(repeaterFormField.getGroupFields());
                    String json = new Gson().toJson(repeaterFormField.getRepeaterFormFields().getFormField());
                    if (!allowRepeat || rowLimitation == 1)
                        formFieldsArrayList.add((List<FormField>) new Gson().fromJson(json, new TypeToken<List<FormField>>() {
                        }.getType()));
                } else {
                    SharedPreferences formIdsSharedPreferences = AppSteerUtils.getLocalStore(username + "formIds_WRT_formUUID_subapp", context);
                    Set<String> formIdsSet = formIdsSharedPreferences.getStringSet(linkedAppUUID, null);
                    if (formIdsSet != null && formIdsSet.size() > 0) {
                        for (String formId : formIdsSet) {
                            SharedPreferences sharedPreferences = AppSteerUtils.getLocalStore(username + "form_subapp", context);
                            String result = sharedPreferences.getString(formId, "");
                            if (result != null && !result.equals("")) {
                                try {
                                    JSONObject formObject = new JSONObject(result);
                                    JSONObject forms = formObject.getJSONObject("Forms");
                                    JSONObject form = (JSONObject) forms.getJSONArray("Form").get(0);
                                    JSONObject formViews = form.getJSONObject("FormViews");
                                    JSONObject formView = formViews.getJSONArray("FormView").getJSONObject(0);
                                    JSONObject FormViewHeaders = formView.getJSONObject("FormViewHeaders");
                                    JSONObject formViewHeader = FormViewHeaders.getJSONArray("FormViewHeader").getJSONObject(0);
                                    JSONObject formFields = formViewHeader.getJSONObject("FormFields");
                                    JSONArray fields = formFields.getJSONArray("FormField");

                                    RepeaterFormFields rep = new RepeaterFormFields();
                                    rep.setFormField(new Gson().fromJson(fields.toString(), new TypeToken<List<FormField>>() {
                                    }.getType()));
                                    repeaterFormField.setRepeaterFormFields(rep);
                                    if (list != null && list.size() != 0) {
                                        repeaterFormField.getRepeaterFormFields().setHashMapFields(list);
                                    }
                                    if (!allowRepeat || rowLimitation == 1)
                                        formFieldsArrayList.add((List<FormField>) new Gson().fromJson(fields.toString(), new TypeToken<List<FormField>>() {
                                        }.getType()));

                                } catch (Exception e) {
                                    e.printStackTrace();
                                }
                                break;
                            }
                        }
                    }

                }
                HashMap<Integer, Object> hashMapFields = new HashMap<>();
                list.add(hashMapFields);
                if (repeaterFormField.getRepeaterFormFields() != null)
                    repeaterFormField.getRepeaterFormFields().setHashMapFields(list);
            }
        }
        if (allowRepeat && rowLimitation != 1) {
            LinearLayout addLinearLayout = createAddLinearLayout(0);

            RelativeLayout.LayoutParams params = new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            params.addRule(RelativeLayout.ALIGN_PARENT_END);
            params.setMargins(15, 15, 20, 15);
            //For Add icon on the group/subapp label
            if (addLinearLayout.getParent() != null) {
                ((ViewGroup) addLinearLayout.getParent()).removeView(addLinearLayout);
            }
            addLinearLayout.setLayoutParams(params);
            rootLayout.addView(addLinearLayout);
            addLinearLayout.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (readOnly)
                        return;
                    boolean isFromLabelButton = true;
                    addAnotherRow(addLinearLayout, isFromLabelButton);
                    
                    AppSteerUtils.progressON(context);
                    Intent intent = new Intent("CHANGE_IN_REPEATER_ROWS");
                    LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
                }
            });
        }
    }

    void addHeaderInTable() {
        if (formFieldsArrayList == null || formFieldsArrayList.size() == 0)
            return;

        TableLayout.LayoutParams tableRowParams = new TableLayout.LayoutParams
                (TableLayout.LayoutParams.WRAP_CONTENT, TableLayout.LayoutParams.WRAP_CONTENT);

        TableRow tbRow0 = new TableRow(context);
        tbRow0.setLayoutParams(tableRowParams);

        for (int k = 0; k < formFieldsArrayList.get(0).size() + 1; k++) {
            if (k != formFieldsArrayList.get(0).size()) {
                FormField formField = formFieldsArrayList.get(0).get(k);
                List<FieldAttribute> fieldAttribute = formField.getFieldAttributes().getFieldAttribute();

                boolean isTableFieldHidden = false;
                for (int j = 0; j < fieldAttribute.size(); j++) {

                    FieldAttribute attr = fieldAttribute.get(j);
                    switch (attr.getAttrID()) {
                        case 172: //Hidden
                            if (attr.getAttrValue() != null && !attr.getAttrValue().equals("") && !attr.getAttrValue().startsWith("=")) {
                                if (Boolean.valueOf(attr.getAttrValue())) {
                                    isTableFieldHidden = true;
                                } else {
                                    formField.setHidden(false);
                                    isTableFieldHidden = false;
                                }
                            }
                            break;
                    }
                }
                if (isTableFieldHidden || formField.getUIType() == 30)
                    continue;
            }

            RelativeLayout relativeLayout = new RelativeLayout(context);
            TableRow.LayoutParams params = new TableRow.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);

            relativeLayout.setLayoutParams(params);
            TextView tv0 = new TextView(context);
            tv0.setGravity(Gravity.START);

            tv0.setMovementMethod(new ScrollingMovementMethod());
            if (k == formFieldsArrayList.get(0).size()) {
                tv0.setText("");
            } else {
                String fieldLabel = formFieldsArrayList.get(0).get(k).getUILabel();
                fieldLabel = fieldLabel.toUpperCase();
                tv0.setText(fieldLabel);
            }

            tv0.setSingleLine(false);
            tv0.setTextColor(Color.BLACK);
            tv0.setTypeface(null, Typeface.BOLD);
            tv0.setTextSize(15);
            tv0.setPadding(20, 20, 20, 20);

            RelativeLayout.LayoutParams relativeLoutParams1 = new RelativeLayout.LayoutParams(
                    ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            tv0.setLayoutParams(relativeLoutParams1);
            relativeLayout.addView(tv0);


            tbRow0.addView(relativeLayout);
        }

        tableLayout.addView(tbRow0);
    }

    LinearLayout.LayoutParams buttonLayoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.WRAP_CONTENT, (int) ControlUtils.convertDpToPixel(30));

    @RequiresApi(api = Build.VERSION_CODES.O)
    void drawUI(final Context context, final int index, LinearLayout
            linearLayout, List<FormField> fields,
                int repeaterNumberOfColumn, GridLayout fieldGridLayout) {
        if (allowRepeat) {
            if (displayAs == 2) {
                if (formFieldsArrayList.size() > 0) {
                    nextImageview.setVisibility(View.VISIBLE);
                    prevImageview.setVisibility(View.VISIBLE);
                    textviewCount.setVisibility(View.VISIBLE);
                }
                if (rowLimitation != 3) {
                    textviewCount.setText(formField.getVisibleItemPosition() + 1 + " - " + numberOfRows);
                } else {
                    textviewCount.setText(String.valueOf(formField.getVisibleItemPosition() + 1) + " - " + formFieldsArrayList.size());
                }
            } else {
                if (rowLimitation != 3) {
                    textviewCount.setText(formFieldsArrayList.size() + " - " + numberOfRows);
                } else {
                    textviewCount.setText(String.valueOf(formFieldsArrayList.size()));
                }
            }
        }
        if (!allowRepeat && index > 0)
            return;

        if (formFieldsArrayList.size() == formField.getVisibleItemPosition() + 1) {
            nextImageview.setEnabled(false);
            nextImageview.setAlpha((float) 0.3);
        } else {
            nextImageview.setEnabled(true);
            nextImageview.setAlpha((float) 1);
        }

        if (formField.getVisibleItemPosition() == 0) {
            prevImageview.setEnabled(false);
            prevImageview.setAlpha((float) 0.3);
        } else {
            prevImageview.setEnabled(true);
            prevImageview.setAlpha((float) 1);
        }

        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ActionBar.LayoutParams.WRAP_CONTENT);
        linearLayout.setLayoutParams(layoutParams);

        if (repeaterNumberOfColumn < 1) {
            repeaterNumberOfColumn = 1;
            fieldGridLayout.setColumnCount(1);
        } else {
            fieldGridLayout.setColumnCount(repeaterNumberOfColumn);
        }

        HashMap<Integer, Object> hashMapFields = repeaterFormField.getRepeaterFormFields().getHashMapFields().get(index);
        fieldGridLayout.setRowOrderPreserved(true);

        if (fieldGridLayout.getParent() != null)
            ((ViewGroup) fieldGridLayout.getParent()).removeView(fieldGridLayout);

        TableRow tbRow = null;
        if (displayAs == 1)
            tbRow = new TableRow(context);


        int rowCount = 0;
        for (int k = 0; k < fields.size(); k++) {
            FormField formField = fields.get(k);
            List<FieldAttribute> fieldAttribute = formField.getFieldAttributes().getFieldAttribute();
            for (int j = 0; j < fieldAttribute.size(); j++) {
                FieldAttribute attr = fieldAttribute.get(j);
                switch (attr.getAttrID()) {
                    case 261:
                        //Row No
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            int rowNo = Integer.parseInt(attr.getAttrValue());
                            if (rowNo > rowCount)
                                rowCount = rowNo;
                        }
                        break;
                }
            }
        }

        fieldGridLayout.setRowCount(rowCount);
        for (int k = 0; k < fields.size(); k++) {
            FormField field = fields.get(k);

            LinearLayout fieldsLinearLayoutRepeater = new LinearLayout(new ContextThemeWrapper(context, R.style.TextInputLayoutStyle));

            fieldsLinearLayoutRepeater.setOrientation(LinearLayout.VERTICAL);
            fieldsLinearLayoutRepeater.setTag("FLL_" + field.getFieldID());
            fieldsLinearLayoutRepeater.bringToFront();
            fieldsLinearLayoutRepeater.setFocusable(false);

            LinearLayout.LayoutParams fieldParams = new LinearLayout.LayoutParams(ActionBar.LayoutParams.MATCH_PARENT, ActionBar.LayoutParams.WRAP_CONTENT);
            fieldParams.weight = 1;

            FormField formField = fields.get(k);

            int formId = 0;
            try {
                formId = formParser.getViewsList().get(formParser.getCurrentView()).getFormID();
            } catch (Exception e) {
                e.printStackTrace();
            }

            if (readOnly) {
                formField.setRestricted(true);
                formField.setViewRestricted(Boolean.valueOf(isHidden));
            }

            int uiType = fields.get(k).getUIType();

            //Let's check whether the attachment field has allowRepeater enabled or not
            boolean isRepeaterEnabled = false;
            if (uiType == 21) {
                List<FieldAttribute> fieldAttributes = fields.get(k).getFieldAttributes().getFieldAttribute();
                for (FieldAttribute fieldAttribute : fieldAttributes) {
                    if (fieldAttribute.getAttrID() == 213) {
                        //Repeat
                        if (fieldAttribute.getAttrValue() != null && !fieldAttribute.getAttrValue().equals("")) {
                            isRepeaterEnabled = Boolean.parseBoolean(fieldAttribute.getAttrValue());
                        }
                        break;
                    }
                }
            }

            //Display the alert message when the current group/subapp field has any group/subapp/repeaterEnabled field inside it
            if (uiType == 30 || uiType == 28 || (uiType == 21 && isRepeaterEnabled)) {
                TextView alertIcon = unsupportedFieldAlertLayout.findViewById(R.id.alert_icon);
                TextView alertText = unsupportedFieldAlertLayout.findViewById(R.id.alert_text);
                alertIcon.setTypeface(Typeface.createFromAsset(context.getAssets(), "fonts/icomoon.ttf"));
                alertIcon.setText(R.string.icon_shield_warning);
                alertText.setText("Some of the fields are not supported. You will not be able to submit the complete data.");
                unsupportedFieldAlertLayout.setVisibility(View.VISIBLE);
            }

            switch (uiType) {
                case 0:
                    new EditTextControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                case 1:
                    new RadioButtonControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                case 2:
                    new SpinnerControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                case 3:
                    new CheckBoxControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                case 4:
                    break;
                case 5:
                    new ImageViewControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, repeaterFormField.getFieldID(), txtViewLabel, headerPosition, this.formField);
                    break;
                case 6:
                    try {
                        new FingerPrintControl(tbRow, fieldGridLayout, (AppCompatActivity) context, formField, fieldsLinearLayoutRepeater, repeaterNumberOfColumn, true, index, formParser, hashMapFields, repeaterFormField.getFieldID(), txtViewLabel, headerPosition, this.formField);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                    break;
                case 7:
                    new DatePickerControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                case 8:
                    new AudioRecordControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, repeaterFormField.getFieldID(), txtViewLabel, headerPosition, this.formField);
                    break;
                case 9:
                    new FetchDetailsControl(tbRow, fieldGridLayout, (AppCompatActivity) context, formField, fieldsLinearLayoutRepeater, fieldParams, formId, repeaterNumberOfColumn, true, index, formParser, hashMapFields, headerPosition);
                    break;
                case 22:
                    new FingerprintAuthentication(tbRow, fieldGridLayout, (AppCompatActivity) context, formField, fieldsLinearLayoutRepeater, fieldParams, formId, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                case 10:
                    new VideoRecordControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, repeaterFormField.getFieldID(), txtViewLabel, headerPosition, this.formField);
                    break;
                case 11:
                    new RatingControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                case 12:
                    new BarCodeControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, repeaterNumberOfColumn, fieldParams, true, index, formParser, hashMapFields, repeaterFormField.getFieldID(), txtViewLabel, headerPosition, this.formField);
                    break;
                case 13:
                    new RichTextControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, headerPosition);
                    break;
                case 14:
                    new LocationControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, repeaterFormField.getFieldID(), txtViewLabel, headerPosition, this.formField);
                    break;
                case 15:
                    //new AdditionalActionControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, repeaterNumberOfColumn, true, index, formParser, hashMapFields);
                    break;
                case 16:
                    new LineControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, repeaterNumberOfColumn, true, index, formParser, headerPosition);
                    break;
                case 18:
                    new NumericEditTextControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                case 19:
                    new SignatureControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, repeaterFormField.getFieldID(), txtViewLabel, headerPosition, this.formField);
                    break;
                case 23:
                    new ImageValidator(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, repeaterFormField.getFieldID(), txtViewLabel, headerPosition, this.formField);
                    break;
                case 21:
                    new FileUploadControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, repeaterFormField.getFieldID(), txtViewLabel, headerPosition, this.formField);
                    break;
                case 27:
                    //new ButtonControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser);
                    break;
                case 33: //Label
                    new TextViewControl(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                case 29:
                    new SequeceGenerator(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                case 31:
                    new MultiSelectDropdown(tbRow, fieldGridLayout, context, formField, fieldsLinearLayoutRepeater, fieldParams, repeaterNumberOfColumn, true, index, formParser, hashMapFields, txtViewLabel, headerPosition, this.formField);
                    break;
                default:
                    break;
            }
        }

        LinearLayout addLinearLayout = createAddLinearLayout(index);
        LinearLayout removeLinearLayout = createRemoveLinearLayout(index);

        if (rowLimitation == 1) {
            addLinearLayout.setVisibility(View.GONE);
            removeLinearLayout.setVisibility(View.GONE);
        }

        if (displayAs == 1) {
            if (horizontalScrollView.getParent() != null) {
                ((ViewGroup) horizontalScrollView.getParent()).removeView(horizontalScrollView);
            }

            if (formFieldsArrayList.size() >= 1) {
                TableRow.LayoutParams buttonLayoutParams = new TableRow.LayoutParams(ActionBar.LayoutParams.WRAP_CONTENT, ActionBar.LayoutParams.MATCH_PARENT);
                buttonLayoutParams.setMargins(10, 0, 0, 0);
                buttonLayoutParams.gravity = Gravity.CENTER;
                removeLinearLayout.setLayoutParams(buttonLayoutParams);
                tbRow.addView(removeLinearLayout);
            }

            tableLayout.addView(tbRow);
            linearLayout.addView(horizontalScrollView);
        } else {
            linearLayout.setPadding(10, 10, 10, 10);
            layoutParams.setMargins(0, 20, 0, 0);
            linearLayout.addView(fieldGridLayout);
        }

        if (displayAs != 1) {
            LinearLayout addDeleteLayout = new LinearLayout(context);
            if (addDeleteLayout.getParent() != null) {
                ((ViewGroup) addDeleteLayout.getParent()).removeView(addDeleteLayout);
            }

            if (removeLinearLayout.getParent() != null) {
                ((ViewGroup) removeLinearLayout.getParent()).removeView(removeLinearLayout);
            }

            removeLinearLayout.setLayoutParams(buttonLayoutParams);
            addDeleteLayout.addView(removeLinearLayout);
            addDeleteLayout.addView(addLinearLayout);

            buttonLayoutParams.setMargins(25, 25, 12, 25);
            addDeleteLayout.setGravity(Gravity.CENTER_VERTICAL | Gravity.END);
            addDeleteLayout.setLayoutParams(buttonLayoutParams);
            linearLayout.addView(addDeleteLayout);

            if (readOnly || !allowRepeat) {
                addDeleteLayout.setVisibility(View.GONE);
            } else {
                addDeleteLayout.setVisibility(View.VISIBLE);
            }
        }

        addLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (readOnly)
                    return;
                addAnotherRow(addLinearLayout, false);
                AppSteerUtils.progressON(context);
                Intent intent = new Intent("CHANGE_IN_REPEATER_ROWS");
                LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
            }
        });

        removeLinearLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (readOnly)
                    return;
                recyclerView.removeAllViews();

                if (tableLayout != null) {
                    tableLayout.removeAllViews();
                    addHeaderInTable();
                }

                if (formField.getVisibleItemPosition() != 0) {
                    formField.setVisibleItemPosition(formField.getVisibleItemPosition() - 1);
                }

                isRecyclerviewCalled = true;
                formFieldsArrayList.remove(formFieldsArrayList.get(index));
                formField.getRepeaterFormFields().getHashMapFields().remove(index);
                if (allowRepeat && displayAs == 2 && formFieldsArrayList.size() == 0) {
                    nextImageview.setVisibility(View.GONE);
                    prevImageview.setVisibility(View.GONE);
                    textviewCount.setVisibility(View.GONE);
                }
                repeaterViewAdapter.notifyDataSetChanged();

                ArrayList<Object> arrayList = new ArrayList<>();
                arrayList.add(recyclerView);
                arrayList.add(formFieldsArrayList);
                arrayList.add(txtViewLabel);
                arrayList.add(repeaterFormField);
                formParser.getHashMapFields().put(repeaterFormField.getFieldID(), arrayList);
                formParser.getRepeaterHashMapFields().put(repeaterFormField.getFieldID(), arrayList);

                AppSteerUtils.progressON(context);
                Intent intent = new Intent("CHANGE_IN_REPEATER_ROWS");
                LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
            }
        });

        // 1= Table
        //2 = single card
        //3 = continoues cards
        if (index == formFieldsArrayList.size() - 1) {
            isRecyclerviewCalled = false;
            isRecyclerviewCalledFromFetchDetails = false;

            Intent bcIntent = new Intent("repeaterFieldValueChanged");
            bcIntent.putExtra("formParser", (Parcelable) formParser);
            bcIntent.putExtra("groupFieldId", formField.getFieldID());
            LocalBroadcastManager.getInstance(context).sendBroadcast(bcIntent);
        } else {
            if (scrollOrientation == 1 && displayAs == 3) {
                View view = new View(context);
                LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, (int) ControlUtils.convertDpToPixel(1));
                params.setMargins(0, (int) ControlUtils.convertDpToPixel(12), 0, 0);
                view.setLayoutParams(params);
                view.setBackgroundColor(context.getResources().getColor(R.color.edittext_border));
                linearLayout.addView(view);
            }
        }

        if (displayAs == 2) {
            if (index == formField.getVisibleItemPosition())
                linearLayout.setVisibility(View.VISIBLE);
            else {
                LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(0, 0);
                params.height = 0;
                params.width = 0;
                linearLayout.setLayoutParams(params);
            }
        }
    }

    public NonScrollRecyclerView getRepeaterRecyclerView() {
        return this.recyclerView;
    }

    void addAnotherRow(LinearLayout addLinearLayout, boolean isFromLabelButton) {
        if (rowLimitation == 2 && formFieldsArrayList.size() == numberOfRows) {
            Toast.makeText(context, "You can not add more than " + numberOfRows + " rows", Toast.LENGTH_LONG).show();
            return;
        }

        recyclerView.removeAllViews();
        if (tableLayout != null) {
            tableLayout.removeAllViews();
            addHeaderInTable();
        }

        int indexOfButtonClicked;
        if (addLinearLayout.getTag() instanceof Integer) {
            Integer integerIndexVal = (Integer) addLinearLayout.getTag();
            indexOfButtonClicked = integerIndexVal.intValue();
        } else {
            indexOfButtonClicked = (int) addLinearLayout.getTag();
        }

        if (isFromLabelButton && formFieldsArrayList.size() > 0)
            indexOfButtonClicked = formFieldsArrayList.size() - 1;

        int formFieldsIndex = 0;
        if (formFieldsArrayList.size() == 0)
            formFieldsIndex = 0;
        else
            formFieldsIndex = indexOfButtonClicked + 1;

        if (formField.getUIType() == 25 || formField.getUIType() == 30) {
            if (formField.getUIType() == 30)
                repeaterFormField.setRepeaterFormFields(repeaterFormField.getGroupFields());
            String json = new Gson().toJson(repeaterFormField.getRepeaterFormFields().getFormField());
            formFieldsArrayList.add(formFieldsIndex, (List<FormField>) new Gson().fromJson(json, new TypeToken<List<FormField>>() {
            }.getType()));
        } else {
            SharedPreferences formIdsSharedPreferences = AppSteerUtils.getLocalStore(username + "formIds_WRT_formUUID_subapp", context);
            Set<String> formIdsSet = formIdsSharedPreferences.getStringSet(linkedAppUUID, null);
            if (formIdsSet != null && formIdsSet.size() > 0) {
                for (String formId : formIdsSet) {
                    SharedPreferences sharedPreferences = AppSteerUtils.getLocalStore(username + "form_subapp", context);
                    String result = sharedPreferences.getString(formId, "");
                    if (result != null && !result.equals("")) {
                        try {
                            JSONObject formObject = new JSONObject(result);
                            JSONObject forms = formObject.getJSONObject("Forms");
                            JSONObject form = (JSONObject) forms.getJSONArray("Form").get(0);
                            JSONObject formViews = form.getJSONObject("FormViews");
                            JSONObject formView = formViews.getJSONArray("FormView").getJSONObject(0);
                            JSONObject FormViewHeaders = formView.getJSONObject("FormViewHeaders");
                            JSONObject formViewHeader = FormViewHeaders.getJSONArray("FormViewHeader").getJSONObject(0);
                            JSONObject formFields = formViewHeader.getJSONObject("FormFields");
                            JSONArray fields = formFields.getJSONArray("FormField");

                            ArrayList list = repeaterFormField.getRepeaterFormFields().getHashMapFields();

                            RepeaterFormFields rep = new RepeaterFormFields();
                            rep.setFormField(new Gson().fromJson(fields.toString(), new TypeToken<List<FormField>>() {
                            }.getType()));
                            repeaterFormField.setRepeaterFormFields(rep);
                            if (list != null && list.size() != 0) {
                                repeaterFormField.getRepeaterFormFields().setHashMapFields(list);
                            }
                            formFieldsArrayList.add(formFieldsIndex, (List<FormField>) new Gson().fromJson(fields.toString(), new TypeToken<List<FormField>>() {
                            }.getType()));

                        } catch (Exception e) {
                            e.printStackTrace();
                        }

                        break;
                    }
                }
            }
        }

        HashMap<Integer, Object> hashMapFields = new HashMap<>();
        if (repeaterFormField.getRepeaterFormFields() != null) {
            ArrayList list = repeaterFormField.getRepeaterFormFields().getHashMapFields();
            list.add(formFieldsIndex, hashMapFields);
            repeaterFormField.getRepeaterFormFields().setHashMapFields(list);
        }

        isRecyclerviewCalled = true;
        if (!isFromLabelButton && formFieldsArrayList.size() > 0)
            formField.setVisibleItemPosition(formField.getVisibleItemPosition() + 1);
        else
            formField.setVisibleItemPosition(formFieldsIndex);

        if (allowRepeat && displayAs == 2 && formFieldsArrayList.size() > 0) {
            nextImageview.setVisibility(View.VISIBLE);
            prevImageview.setVisibility(View.VISIBLE);
            textviewCount.setVisibility(View.VISIBLE);
        }
        repeaterViewAdapter.notifyDataSetChanged();

        ArrayList<Object> arrayList = new ArrayList<>();
        arrayList.add(recyclerView);
        arrayList.add(formFieldsArrayList);
        arrayList.add(txtViewLabel);
        arrayList.add(repeaterFormField);
        RepeaterControl.this.formParser.getHashMapFields().put(formField.getFieldID(), arrayList);
        RepeaterControl.this.formParser.getRepeaterHashMapFields().put(formField.getFieldID(), arrayList);
    }

    TextView removeImageview;

    LinearLayout createRemoveLinearLayout(int index) {
        LinearLayout removeLinearLayout = new LinearLayout(context);
        removeLinearLayout.setOrientation(LinearLayout.HORIZONTAL);
        removeLinearLayout.setTag(index);
        removeLinearLayout.setGravity(Gravity.CENTER);

        removeLinearLayout.setBackgroundColor(context.getResources().getColor(R.color.transparent));
        removeImageview = new TextView(context);
        removeImageview.setTypeface(Typeface.createFromAsset(context.getAssets(), "fonts/icomoon.ttf"));
        removeImageview.setTextSize(TypedValue.COMPLEX_UNIT_SP, 16);
        removeImageview.setTextColor(Color.parseColor(themeColor2));
        removeImageview.setTag(index);
        removeImageview.setText(R.string.icon_delete);
        removeImageview.setPadding((int) ControlUtils.convertDpToPixel(6), (int) ControlUtils.convertDpToPixel(6), (int) ControlUtils.convertDpToPixel(6), (int) ControlUtils.convertDpToPixel(6));

        removeLinearLayout.addView(removeImageview);
        removeLinearLayout.setOrientation(LinearLayout.HORIZONTAL);
        buttonLayoutParams.gravity = Gravity.END | Gravity.CENTER_VERTICAL;

        removeLinearLayout.setLayoutParams(buttonLayoutParams);
        removeLinearLayout.setGravity(Gravity.CENTER_VERTICAL | Gravity.END);

        return removeLinearLayout;
    }

    TextView addImageview;

    LinearLayout createAddLinearLayout(int index) {
        LinearLayout addLinearLayout = new LinearLayout(context);
        addLinearLayout.setOrientation(LinearLayout.HORIZONTAL);
        addLinearLayout.setTag(index);
        addLinearLayout.setGravity(Gravity.CENTER);

        addImageview = new TextView(context);
        addImageview.setTypeface(Typeface.createFromAsset(context.getAssets(), "fonts/icomoon.ttf"));
        addImageview.setTextSize(TypedValue.COMPLEX_UNIT_SP, 20);
        addImageview.setTextColor(Color.parseColor(themeColor2));
        addImageview.setTag(index);
        addImageview.setText(R.string.icon_plus);
        addImageview.setPadding((int) ControlUtils.convertDpToPixel(12), (int) ControlUtils.convertDpToPixel(6), (int) ControlUtils.convertDpToPixel(6), (int) ControlUtils.convertDpToPixel(6));

        addLinearLayout.addView(addImageview);
        addLinearLayout.setOrientation(LinearLayout.HORIZONTAL);
        buttonLayoutParams.gravity = Gravity.END | Gravity.CENTER_VERTICAL;

        addLinearLayout.setLayoutParams(buttonLayoutParams);
        addLinearLayout.setGravity(Gravity.CENTER_VERTICAL | Gravity.END);

        return addLinearLayout;
    }

    int displayAs;
    int scrollOrientation = 1;
    boolean allowRepeat;
    String isPII;
    boolean isFieldLevelRestricted, restrictView, restrictEdit, showLabelMultiline;
    String allowDeletingRecordsWhileEdit;
    String allowAddingNewRecordsWhileEdit;

    public void drawControl
            (List<FieldAttribute> fieldAttribute) {
        int marginLeft = 0, marginTop = 0, marginRight = 0, marginBottom = 0;
        for (int j = 0; j < fieldAttribute.size(); j++) {
            try {
                FieldAttribute attr = fieldAttribute.get(j);
                switch (attr.getAttrID()) {
                    case 120: //Is Mandatory
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            if (!attr.getAttrValue().startsWith("=")) {
                                formField.setIsMandatory(Boolean.valueOf(attr.getAttrValue()));
                            }
                        }
                        break;
                    case 244:
                        // Force Validation
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            formField.setForceValidate(Boolean.valueOf(attr.getAttrValue()));
                        }
                        break;
                    case 224: //Label Style
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            String attributeValue = attr.getAttrValue().replace("\\", "");
                            JSONArray array = new JSONArray(attributeValue);
                            JSONObject object = array.getJSONObject(0);
                            showLabelMultiline = object.getInt("id") == 2;
                        }
                        break;
                    case 220:
                        //Allow adding new records while edit
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("") && !attr.getAttrValue().startsWith("=")) {
                            allowAddingNewRecordsWhileEdit = attr.getAttrValue();
                        }
                        break;
                    case 221:
                        //Allow deleting records while edit
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("") && !attr.getAttrValue().startsWith("=")) {
                            allowDeletingRecordsWhileEdit = attr.getAttrValue();
                        }
                        break;
                    case 215: //Restrictions
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            try {
                                String attributeValue = attr.getAttrValue().replace("\\", "");
                                JSONArray array = new JSONArray(attributeValue);
                                if (array != null && array.length() > 0) {
                                    JSONObject object = array.getJSONObject(0);
                                    JSONArray userArray = object.getJSONArray("users");
                                    JSONArray groupsArray = object.getJSONArray("groups");

                                    SharedPreferences userDetails = AppSteerUtils.getLocalStore(Constants.KYC_SHARED_PREFERENCE, context);
                                    JSONObject userInfo = new JSONObject(userDetails.getString("userInfo", ""));
                                    String userUUID = userInfo.getString("uuid");


                                    for (int i = 0; i < userArray.length(); i++) {
                                        JSONObject userObject = userArray.getJSONObject(0);
                                        String userUUIDInObject = userObject.getString("uuid");
                                        if (userUUIDInObject.equals(userUUID)) {
                                            isFieldLevelRestricted = true;
                                            restrictView = userObject.getBoolean("restrict_view");
                                            restrictEdit = userObject.getBoolean("restrict_edit");
                                            break;
                                        }
                                    }

                                    if (!isFieldLevelRestricted) {
                                        JSONArray groupUUIDs = userInfo.getJSONArray("assignedGroupUUID");
                                        for (int k = 0; k < groupUUIDs.length(); k++) {
                                            String groupUUID = String.valueOf(groupUUIDs.get(k));
                                            for (int i = 0; i < groupsArray.length(); i++) {
                                                JSONObject groupObject = groupsArray.getJSONObject(i);
                                                String groupUUIDInObject = groupObject.getString("uuid");
                                                if (groupUUIDInObject.equals(groupUUID)) {
                                                    isFieldLevelRestricted = true;
                                                    restrictView = groupObject.getBoolean("restrict_view");
                                                    restrictEdit = groupObject.getBoolean("restrict_edit");
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                        break;
                    case 214: //Is PII
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("") && !attr.getAttrValue().startsWith("=")) {
                            isPII = attr.getAttrValue();
                        }
                        break;

                    case 213:
                        //Repeat
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            allowRepeat = Boolean.parseBoolean(attr.getAttrValue());
                        }
                        break;
                    case 188:
                        //Number of Rows
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            numberOfRows = Integer.parseInt(attr.getAttrValue());
                        }
                        break;

                    case 212:
                        //Scroll
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            // 1= vertical
                            JSONArray jsonArray = new JSONArray(attr.getAttrValue().replace("\\", ""));
                            scrollOrientation = jsonArray.getJSONObject(0).getInt("id");
                            //scrollOrientation = 2;
                        }
                        break;
                    case 211:
                        //Display as
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            // 1= Table
                            //2 = single card
                            //3 = continoues cards

                            JSONArray jsonArray = new JSONArray(attr.getAttrValue().replace("\\", ""));
                            displayAs = jsonArray.getJSONObject(0).getInt("id");
                            //scrollOrientation = 2;
                        }
                        break;
                    case 203: //Linked App
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            linkedAppUUID = attr.getAttrValue();
                        }
                        break;
                    case 187:
                        //Rows
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            // 1== fixed number of rows
                            //2== limit the number rows
                            // 3== No LImit

                            JSONArray jsonArray = new JSONArray(attr.getAttrValue().replace("\\", ""));
                            rowLimitation = jsonArray.getJSONObject(0).getInt("id");
                        }
                        break;
                    case 186:
                        //Number of Columns
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            repeaterNumberOfColumn = Integer.parseInt(attr.getAttrValue());
                        }

                        break;

                    case 128: //Column No.
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            colNo = Integer.parseInt(attr.getAttrValue());
                        }

                        break;
                    case 129: //Column Span
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            colSpan = Integer.parseInt(attr.getAttrValue());
                        }
                        break;
                    case 131: //Row Span
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            rowSpan = Integer.parseInt(attr.getAttrValue());
                        }
                        break;
                    case 261:
                        //Row No
                        if (attr.getAttrValue() != null && !attr.getAttrValue().equals("")) {
                            rowNo = Integer.parseInt(attr.getAttrValue());
                        }
                        break;
                    default:
                        break;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        this.fieldParams.setMargins(marginLeft, (int) ControlUtils.convertDpToPixel(12f), marginRight, (int) ControlUtils.convertDpToPixel(2f));
    }

    public boolean isRecyclerviewCalled = false;
    public static boolean isRecyclerviewCalledFromFetchDetails = false;

    public class RepeaterViewAdapter extends RecyclerView.Adapter<RepeaterViewAdapterHolder> {
        Context context;

        RepeaterViewAdapter(Context context) {
            this.context = context;
        }


        @Override
        public RepeaterViewAdapterHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.repeater_content, parent, false);
            return new RepeaterViewAdapterHolder(itemView);
        }

        @Override
        public void onBindViewHolder(RepeaterControl.RepeaterViewAdapterHolder holder, int position, List<Object> payloads) {
            Log.d("Adapter", "onBindViewHolder payloads position" + position);
            super.onBindViewHolder(holder, position, payloads);
        }

        @RequiresApi(api = Build.VERSION_CODES.O)
        @Override
        public void onBindViewHolder(RepeaterViewAdapterHolder holder, int position) {
            //When attribute is updated from formPager
            //This block of if{} is required when attributes related to group field are changed on change attribute macro perform
            if (isFromFormPager) drawInitialUI();

            GridLayout gridLayout = new GridLayout(context);
            GridLayout.LayoutParams params = new GridLayout.LayoutParams();
            params.setMargins((int) ControlUtils.convertDpToPixel(8), 0, 0, 0);
            params.height = ViewGroup.LayoutParams.MATCH_PARENT;

            DisplayMetrics displayMetrics = new DisplayMetrics();
            ((Activity) context).getWindowManager()
                    .getDefaultDisplay()
                    .getMetrics(displayMetrics);
            int width = displayMetrics.widthPixels;

            int gridWidth = (int) (width - ControlUtils.convertDpToPixel(55));
            params.width = gridWidth;
            params.setGravity(Gravity.CENTER);
            gridLayout.setLayoutParams(params);

            gridLayout.setFocusable(false);
            gridLayout.bringToFront();

            if (displayAs == 1) {
                if (isRecyclerviewCalled || isRecyclerviewCalledFromFetchDetails) {
                    callDrawUI(position, holder.rootLayout, gridLayout);
                }
            } else {
                callDrawUI(position, holder.rootLayout, gridLayout);
            }
        }

        @SuppressLint("NewApi")
        void callDrawUI(int position, LinearLayout rootLayout, GridLayout gridLayout) {
            if (tableLayout != null && position == 0) {
                tableLayout.removeAllViews();
                addHeaderInTable();
            }
            rootLayout.removeAllViews();
            Log.d("Adapter", "onBindViewHolder position" + position);
            drawUI(context, position, rootLayout, formFieldsArrayList.get(position), repeaterNumberOfColumn, gridLayout);
        }

        @Override
        public int getItemCount() {
            Log.d("Adapter", "getItemCount" + formFieldsArrayList.size());
            return formFieldsArrayList.size();
        }
    }

    public class RepeaterViewAdapterHolder extends RecyclerView.ViewHolder {
        LinearLayout rootLayout;

        public RepeaterViewAdapterHolder(View itemView) {
            super(itemView);
            rootLayout = itemView.findViewById(R.id.repeater_root_layout);
        }
    }

    public void setFormFieldsArrayList(List<List<FormField>> formFieldsArrayList) {
        this.formFieldsArrayList = formFieldsArrayList;
        if (formFieldsArrayList.size() == 0) {
            nextImageview.setVisibility(View.GONE);
            prevImageview.setVisibility(View.GONE);
            textviewCount.setVisibility(View.GONE);
        }
    }

    public void setReadOnly(boolean readOnly) {
        this.readOnly = readOnly;
        if (addImageview != null && removeImageview != null) {
            if (readOnly) {
                addImageview.setEnabled(false);
                addImageview.setAlpha((float) 0.6);
            } else {
                addImageview.setEnabled(true);
                addImageview.setAlpha((float) 1);

                removeImageview.setEnabled(true);
                removeImageview.setAlpha((float) 1);
            }
        }
    }
}
